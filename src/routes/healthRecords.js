const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const HealthRecord = require('../models/HealthRecord');

// Generate QR code for user's health record
router.get('/:userId/qrcode', async (req, res) => {
  const { userId } = req.params;
  const recordUrl = `${req.protocol}://${req.get('host')}/api/health-records/${userId}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(recordUrl);
    res.json({ qr: qrDataUrl, url: recordUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Fetch health record by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const records = await HealthRecord.find({ user: userId });
    res.json({ records });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

module.exports = router; 