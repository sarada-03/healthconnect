const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recordType: {
    type: String,
    enum: ['blood_pressure', 'blood_sugar', 'weight'],
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  metadata: {
    measuredAt: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'night'],
      required: function() {
        return this.recordType === 'blood_sugar';
      }
    },
    systolic: {
      type: Number,
      required: function() {
        return this.recordType === 'blood_pressure';
      }
    },
    diastolic: {
      type: Number,
      required: function() {
        return this.recordType === 'blood_pressure';
      }
    }
  }
}, {
  timestamps: true
});

// Index for efficient querying
healthRecordSchema.index({ user: 1, recordType: 1, timestamp: -1 });

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord; 