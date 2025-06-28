const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MenstrualCycle = require('../models/MenstrualCycle');
const { body, validationResult } = require('express-validator');

// Validation middleware
const cycleValidation = [
  body('startDate').isISO8601().withMessage('Invalid start date format'),
  body('flow').isIn(['light', 'medium', 'heavy']).withMessage('Invalid flow value'),
  body('symptoms').optional().isArray().withMessage('Symptoms must be an array'),
  body('painLevel').optional().isInt({ min: 0, max: 10 }).withMessage('Pain level must be between 0 and 10'),
  body('mood').optional().isIn(['happy', 'normal', 'sad', 'irritated', 'anxious']).withMessage('Invalid mood value')
];

// GET /api/menstrual-tracker - Get user's menstrual cycles
router.get('/', auth, async (req, res) => {
  try {
    const cycles = await MenstrualCycle.find({ user: req.user.userId })
      .sort({ startDate: -1 })
      .limit(12); // Last 12 cycles

    res.json({
      success: true,
      cycles
    });
  } catch (error) {
    console.error('Get cycles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menstrual cycles'
    });
  }
});

// POST /api/menstrual-tracker - Create new menstrual cycle entry
router.post('/', auth, cycleValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const cycleData = {
      ...req.body,
      user: req.user.userId
    };

    const cycle = new MenstrualCycle(cycleData);
    await cycle.save();

    res.status(201).json({
      success: true,
      cycle
    });
  } catch (error) {
    console.error('Create cycle error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating menstrual cycle entry'
    });
  }
});

// PUT /api/menstrual-tracker/:id - Update menstrual cycle entry
router.put('/:id', auth, cycleValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const cycle = await MenstrualCycle.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: 'Menstrual cycle entry not found'
      });
    }

    Object.assign(cycle, req.body);
    await cycle.save();

    res.json({
      success: true,
      cycle
    });
  } catch (error) {
    console.error('Update cycle error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating menstrual cycle entry'
    });
  }
});

// DELETE /api/menstrual-tracker/:id - Delete menstrual cycle entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const cycle = await MenstrualCycle.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: 'Menstrual cycle entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Menstrual cycle entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete cycle error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting menstrual cycle entry'
    });
  }
});

// GET /api/menstrual-tracker/stats - Get cycle statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const cycles = await MenstrualCycle.find({ user: req.user.userId })
      .sort({ startDate: -1 })
      .limit(6);

    if (cycles.length < 2) {
      return res.json({
        success: true,
        stats: {
          averageCycleLength: null,
          nextPredictedDate: null,
          message: 'Need at least 2 cycles to calculate statistics'
        }
      });
    }

    // Calculate average cycle length
    let totalDays = 0;
    let validCycles = 0;

    for (let i = 0; i < cycles.length - 1; i++) {
      const currentCycle = cycles[i];
      const nextCycle = cycles[i + 1];
      
      const daysDiff = Math.ceil(
        (new Date(currentCycle.startDate) - new Date(nextCycle.startDate)) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDiff > 0 && daysDiff <= 45) { // Valid cycle length
        totalDays += daysDiff;
        validCycles++;
      }
    }

    const averageCycleLength = validCycles > 0 ? Math.round(totalDays / validCycles) : 28;
    
    // Predict next cycle
    const lastCycle = cycles[0];
    const nextPredictedDate = new Date(lastCycle.startDate);
    nextPredictedDate.setDate(nextPredictedDate.getDate() + averageCycleLength);

    res.json({
      success: true,
      stats: {
        averageCycleLength,
        nextPredictedDate,
        totalCyclesTracked: cycles.length
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating cycle statistics'
    });
  }
});

module.exports = router;