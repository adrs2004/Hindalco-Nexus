const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: [
    'Infrastructure/Facilities', 
    'IT/Technical', 
    'HR & Admin', 
    'Security & Access', 
    'Supplies & Logistics', 
    'Application/Portal Issues'
  ] },
  priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  status: { type: String, default: 'pending', enum: ['pending', 'in-progress', 'resolved', 'rejected', 're-opened'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);