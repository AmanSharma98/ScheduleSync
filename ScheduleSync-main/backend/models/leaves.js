const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  reason: { 
    type: String, 
    required: [true, 'Reason is required'],
    trim: true
  },
  fromDate: { 
    type: Date, 
    required: [true, 'From date is required'],
    validate: {
      validator: function(value) {
        return value <= this.toDate;
      },
      message: 'From date must be before or equal to To date'
    }
  },
  toDate: { 
    type: Date, 
    required: [true, 'To date is required'] 
  },
  subject: { 
    type: String, 
    required: [true, 'subject is required'],
    trim: true
  },
  coursecode: { 
    type: String, 
    required: [true, 'coursecode is required'],
    trim: true
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Leave', leaveSchema);