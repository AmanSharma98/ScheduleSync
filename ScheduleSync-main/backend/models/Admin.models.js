const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  unavailableSlots: [String], // ISO time strings
});

module.exports = mongoose.model('Teacher', teacherSchema);
