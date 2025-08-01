const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin', 'team'], required: true },
  category: { type: String, enum: [
    'Infrastructure/Facilities', 
    'IT/Technical', 
    'HR & Admin', 
    'Security & Access', 
    'Supplies & Logistics', 
    'Application/Portal Issues'
  ], required: function() { return this.role === 'team'; } }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);