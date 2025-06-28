const mongoose = require('mongoose');

const menstrualCycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  symptoms: [{
    type: String,
    enum: [
      'cramps',
      'headache',
      'fatigue',
      'bloating',
      'mood_swings',
      'breast_tenderness',
      'acne',
      'other'
    ]
  }],
  flow: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  medications: [{
    name: String,
    dosage: String,
    time: Date
  }],
  mood: {
    type: String,
    enum: ['happy', 'normal', 'sad', 'irritated', 'anxious']
  },
  painLevel: {
    type: Number,
    min: 0,
    max: 10
  }
}, {
  timestamps: true
});

// Index for efficient querying
menstrualCycleSchema.index({ user: 1, startDate: -1 });

// Method to calculate cycle length
menstrualCycleSchema.methods.getCycleLength = function() {
  if (!this.endDate) return null;
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
};

const MenstrualCycle = mongoose.model('MenstrualCycle', menstrualCycleSchema);

module.exports = MenstrualCycle; 