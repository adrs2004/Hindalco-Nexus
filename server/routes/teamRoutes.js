const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Issue = require('../models/Issue');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all team members (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const teams = await User.find({ role: 'team' }).select('-password');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create team member (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, email, password, category } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'team',
      category
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      category: user.category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this new route for deleting team members
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const teamMember = await User.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    if (teamMember.role !== 'team') {
      return res.status(400).json({ message: 'Can only delete team members' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;