const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leaveRoutes = require('./routes/leaves');

const PORT = 3939;
const app = express();

// Middleware - only declare once
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS',"PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/api/schedules', require("./routes/schedule.routes"));
app.use('/api/users', require("./routes/user.routes"));
app.use('/api/leaves', leaveRoutes);

// Add a catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection and server start
mongoose.connect('mongodb+srv://ScheduleSync:aman1047@userdata.j649i.mongodb.net/?retryWrites=true&w=majority&appName=userdata', {
  dbName: "ScheduleSync"
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Add this to verify Leave model works
  // const Leave = require('./models/leaves');
  // const testLeave = new Leave({
  //   name: 'Test User',
  //   reason: 'Connection test',
  //   fromDate: new Date(),
  //   toDate: new Date(Date.now() + 86400000) ,// Tomorrow
  //   subject:'test subject',
  //   coursecode:'test course',
  //   status: 'Pending',

  // });
  // return testLeave.save();
})

.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.error('MongoDB connection error:', err));