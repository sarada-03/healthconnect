const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');
const auth = require('../middleware/auth');

// GET /api/clinics - Get all clinics
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    let query = { isActive: { $ne: false } };

    // If location provided, find nearby clinics
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    const clinics = await Clinic.find(query)
      .select('-__v')
      .sort({ verified: -1, 'ratings.average': -1 })
      .limit(50);

    res.json({
      success: true,
      clinics
    });
  } catch (error) {
    console.error('Get clinics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clinics'
    });
  }
});

// GET /api/clinics/:id - Get clinic by ID
router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    
    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    res.json({
      success: true,
      clinic
    });
  } catch (error) {
    console.error('Get clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clinic'
    });
  }
});

// POST /api/clinics - Create new clinic (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();

    res.status(201).json({
      success: true,
      clinic
    });
  } catch (error) {
    console.error('Create clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating clinic'
    });
  }
});

// PUT /api/clinics/:id - Update clinic (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    res.json({
      success: true,
      clinic
    });
  } catch (error) {
    console.error('Update clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating clinic'
    });
  }
});

// DELETE /api/clinics/:id - Delete clinic (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    res.json({
      success: true,
      message: 'Clinic deleted successfully'
    });
  } catch (error) {
    console.error('Delete clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting clinic'
    });
  }
});

module.exports = router;