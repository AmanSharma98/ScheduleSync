const express = require('express');
const router = express.Router();
const Leave = require('../models/leaves');
const { isUserAuthenticated } = require('../middlewares/auth.middleware');

// POST /api/leaves
// router.post('/', async (req, res) => {
//   try {
//     const leaveData = {
//       ...req.body,
//       status: 'Pending'
//     };
//     console.log('Leave data:', leaveData);
//     // Convert string dates to Date objects
//     if (req.body.fromDate) leaveData.fromDate = new Date(req.body.fromDate);
//     if (req.body.toDate) leaveData.toDate = new Date(req.body.toDate);

//     const leave = new Leave(leaveData);
//     await leave.save();
//     res.status(201).json(leave);
//   } catch (err) {
//     console.error('Error creating leave:', err);
//     res.status(500).json({ 
//       error: 'Failed to submit leave request',
//       details: err.message
//     });
//   }
// });
router.post('/', isUserAuthenticated, async (req, res) => {
  
  try {
    const user = req.user; // assuming authentication middleware added user to req
    const { reason, fromDate, toDate, subject, coursecode } = req.body;

    const newLeave = new Leave({
      name: user.name,
      userId: user._id,
      reason,
      fromDate,
      toDate,
      subject,
      coursecode,
      status: 'Pending'
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave request submitted successfully', leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while submitting leave request' });
  }
});


// GET /api/leaves
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    console.error('Error fetching leaves:', err);
    res.status(500).json({ 
      error: 'Failed to fetch leave requests',
      details: err.message
    });
  }
});

// PATCH /api/leaves/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        adminComment: req.body.adminComment || ''
      },
      { new: true }
    );
    res.json(updatedLeave);
  } catch (err) {
    console.error('Error updating leave:', err);
    res.status(500).json({ 
      error: 'Failed to update leave request',
      details: err.message
    });
  }
});


module.exports = router;