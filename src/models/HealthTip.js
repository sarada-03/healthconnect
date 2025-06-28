const mongoose = require('mongoose');

const healthTipSchema = new mongoose.Schema({
  title: {
    english: {
      type: String,
      required: true
    },
    telugu: {
      type: String,
      required: true
    }
  },
  content: {
    english: {
      type: String,
      required: true
    },
    telugu: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    enum: [
      'general',
      'nutrition',
      'exercise',
      'mental_health',
      'women_health',
      'chronic_diseases',
      'preventive_care'
    ],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String
  },
  source: {
    name: String,
    url: String
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
healthTipSchema.index({ category: 1, publishDate: -1 });
healthTipSchema.index({ tags: 1 });

const HealthTip = mongoose.model('HealthTip', healthTipSchema);

module.exports = HealthTip; 