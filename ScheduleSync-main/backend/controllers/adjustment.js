const mongoose = require('mongoose');

const adjustmentSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  timeSlot: String,
  status: { type: String, default: 'Pending' }, // Accept / Reject
});

module.exports = mongoose.model('Adjustment', adjustmentSchema);
