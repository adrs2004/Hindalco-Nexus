const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const User = require('../models/User');
const { protect, team, admin } = require('../middleware/authMiddleware');

// Add this at the top
const Report = require('../models/Report');

// Modify the status update endpoint
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.user.id);

    if (user.role !== 'team') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Create report before updating
    const report = new Report({
      action: 'status update',
      description: `Changed status from ${issue.status} to ${status}`,
      issueId: issue._id,
      teamMember: req.user.id,
      oldStatus: issue.status,
      newStatus: status
    });
    await report.save();

    // Update the issue
    issue.status = status;
    if (status === 'in-progress') {
      issue.assignedTo = req.user.id;
    }

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// Create issue
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const photos = req.files?.map(file => file.path);

    const issue = await Issue.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all issues for client
router.get('/client', protect, async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.id });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get issues by category for team
router.get('/team', protect, team, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const issues = await Issue.find({ category: user.category });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update issue status
router.put('/:id/status', protect, team, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.user.id);

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    if (issue.category !== user.category) {
      return res.status(403).json({ message: 'You can only update issues in your category' });
    }

    issue.status = status;
    if (status === 'in-progress') {
      issue.assignedTo = req.user.id;
    }

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this new route for admin to see all issues
router.get('/admin', protect, admin, async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the team issues route to properly filter
router.get('/team', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'team') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const issues = await Issue.find({ 
      category: user.category,
      status: { $ne: 'resolved' } // Only show unresolved issues
    }).populate('createdBy', 'name email');

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;