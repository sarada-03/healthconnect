const express = require('express');
const router = express.Router();

// Sample health tips data
const sampleTips = [
  {
    title: { english: 'Stay hydrated', telugu: 'తగినంత నీరు తాగండి' },
    content: { english: 'Drink at least 8 glasses of water a day.', telugu: 'రోజుకు కనీసం 8 గ్లాసుల నీరు తాగండి.' },
    category: 'general',
    isActive: true
  },
  {
    title: { english: 'Eat fruits and vegetables', telugu: 'పండ్లు మరియు కూరగాయలు తినండి' },
    content: { english: 'Include a variety of fruits and vegetables in your diet.', telugu: 'మీ ఆహారంలో వివిధ రకాల పండ్లు మరియు కూరగాయలు చేర్చండి.' },
    category: 'nutrition',
    isActive: true
  }
];

// GET /api/health-tips
router.get('/', (req, res) => {
  res.json({ tips: sampleTips });
});

module.exports = router; 