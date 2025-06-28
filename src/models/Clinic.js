const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  contactNumbers: [{
    type: String,
    required: true
  }],
  emergencyNumber: {
    type: String
  },
  specialties: [{
    type: String
  }],
  timings: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  services: [{
    type: String
  }],
  isEmergencyUnit: {
    type: Boolean,
    default: false
  },
  is24x7: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
clinicSchema.index({ location: '2dsphere' });

// Index for text search
clinicSchema.index({
  name: 'text',
  'address.city': 'text',
  specialties: 'text',
  services: 'text'
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic; 