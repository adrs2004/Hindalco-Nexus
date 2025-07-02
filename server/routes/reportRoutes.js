const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all reports (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('teamMember', 'name email')
      .populate('issueId', 'title');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;