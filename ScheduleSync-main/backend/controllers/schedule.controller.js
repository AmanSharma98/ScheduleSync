// // const ScheduleModel = require('../models/schedule.model');
// // const UserModel = require('../models/user.model');

// // async function getSchedules(req, res) {
// //     try {
// //         const userId = req.user?.id || "68036c7fd327b2386b1d11e0";

// //         const schedules = await ScheduleModel.find({ teacher: userId }).populate('teacher', 'name').sort({ day: 1, lecture: 1 }).lean();
// //         if (schedules.length > 0) {
// //             res.status(200).json(schedules);
// //         } else {
// //             res.status(404).json({ message: 'No schedules found' });
// //         }

// //     } catch (error) {
// //         console.error('Error fetching schedules:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // }

// // async function addSchedule(req, res) {
// //     try {
// //         const userId = req.user?.id || "68036c7fd327b2386b1d11e0";
// //         const { day, lecture, startTime, endTime, subject, venue, semester } = req.body;

// //         const scheduleId = `${userId}-${day}-${lecture}-${semester}`;

// //         const existingSchedule = await ScheduleModel.findOne({ id: scheduleId });
// //         if (existingSchedule) {
// //             existingSchedule.startTime = startTime;
// //             existingSchedule.endTime = endTime;
// //             existingSchedule.subject = subject;
// //             existingSchedule.venue = venue;
// //             existingSchedule.semester = semester;

// //             const updatedSchedule = await existingSchedule.save();
// //             return res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
// //         }

// //         const schema = new ScheduleModel({
// //             id: scheduleId,
// //             teacher: userId,
// //             day,
// //             lecture,
// //             startTime,
// //             endTime,
// //             subject,
// //             venue,
// //             semester
// //         });

// //         const savedSchedule = await schema.save();
// //         if (savedSchedule) {
// //             res.status(201).json({ message: 'Schedule added successfully', schedule: savedSchedule });
// //         } else {
// //             res.status(400).json({ message: 'Failed to add schedule' });
// //         }

// //     } catch (error) {
// //         console.error('Error adding new schedule:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // }

// // module.exports = {
// //     getSchedules,
// //     addSchedule,
// // };


// const ScheduleModel = require('../models/schedule.model');
// const UserModel = require('../models/user.model');

// async function getSchedules(req, res) {
//     try {
//         const userId = req.user?.id || "68036c7fd327b2386b1d11e0";
//         const { semester } = req.query;

//         const query = { teacher: userId };
//         if (semester) {
//             query.semester = parseInt(semester); // ensure semester is number
//         }

//         const schedules = await ScheduleModel.find(query)
//             .populate('teacher', 'name')
//             .sort({ day: 1, lecture: 1 })
//             .lean();

//         if (schedules.length > 0) {
//             res.status(200).json(schedules);
//         } else {
//             res.status(404).json({ message: 'No schedules found' });
//         }

//     } catch (error) {
//         console.error('Error fetching schedules:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// async function addSchedule(req, res) {
//     try {
//         const userId = req.user?.id || "68036c7fd327b2386b1d11e0";
//         const { day, lecture, startTime, endTime, subject, venue, semester } = req.body;

//         if (!semester || isNaN(semester)) {
//             return res.status(400).json({ message: 'Semester is required and must be a number' });
//         }

//         const parsedSemester = parseInt(semester);
//         const scheduleId = `${userId}-${day}-${lecture}-${parsedSemester}`;

//         const existingSchedule = await ScheduleModel.findOne({ id: scheduleId });
//         if (existingSchedule) {
//             existingSchedule.startTime = startTime;
//             existingSchedule.endTime = endTime;
//             existingSchedule.subject = subject;
//             existingSchedule.venue = venue;
//             existingSchedule.semester = parsedSemester;

//             const updatedSchedule = await existingSchedule.save();
//             return res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
//         }

//         const schema = new ScheduleModel({
//             id: scheduleId,
//             teacher: userId,
//             day,
//             lecture,
//             startTime,
//             endTime,
//             subject,
//             venue,
//             semester: parsedSemester
//         });

//         const savedSchedule = await schema.save();
//         if (savedSchedule) {
//             res.status(201).json({ message: 'Schedule added successfully', schedule: savedSchedule });
//         } else {
//             res.status(400).json({ message: 'Failed to add schedule' });
//         }

//     } catch (error) {
//         console.error('Error adding new schedule:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// module.exports = {
//     getSchedules,
//     addSchedule,
// };

const ScheduleModel = require('../models/schedule.model');
const UserModel = require('../models/user.model');

// Get schedules with optional semester query
async function getSchedules(req, res) {
  try {
    const userId = req.user?.id;
    const { teacherId } = req.query;
    console.log(teacherId);

    const query = { teacher: teacherId || userId };

    const schedules = await ScheduleModel.find(query)
      .populate('teacher', 'name')
      .sort({ day: 1, lecture: 1 })
      .lean();

    if (schedules.length > 0) {
      res.status(200).json(schedules);
    } else {
      res.status(404).json({ message: 'No schedules found' });
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Add a schedule (including semester)
async function addSchedule(req, res) {
  try {
    const userId = req.user?.id || "68036c7fd327b2386b1d11e0";
    const { day, lecture, startTime, endTime, subject, venue, semester } = req.body;

    if (!semester || isNaN(semester)) {
      return res.status(400).json({ message: 'Semester is required and must be a number' });
    }

    const parsedSemester = parseInt(semester);
    const scheduleId = `${userId}-${day}-${lecture}-${parsedSemester}`;

    const existingSchedule = await ScheduleModel.findOne({ id: scheduleId });
    if (existingSchedule) {
      existingSchedule.startTime = startTime;
      existingSchedule.endTime = endTime;
      existingSchedule.subject = subject;
      existingSchedule.venue = venue;
      existingSchedule.semester = parsedSemester;

      const updatedSchedule = await existingSchedule.save();
      return res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
    }

    const schema = new ScheduleModel({
      id: scheduleId,
      teacher: userId,
      day,
      lecture,
      startTime,
      endTime,
      subject,
      venue,
      semester: parsedSemester, // Store semester as number
    });

    const savedSchedule = await schema.save();
    if (savedSchedule) {
      res.status(201).json({ message: 'Schedule added successfully', schedule: savedSchedule });
    } else {
      res.status(400).json({ message: 'Failed to add schedule' });
    }
  } catch (error) {
    console.error('Error adding new schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getSchedules,
  addSchedule,
};

