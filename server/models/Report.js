const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "status update", "issue resolved"
  description: { type: String, required: true },
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  teamMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  oldStatus: { type: String },
  newStatus: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);