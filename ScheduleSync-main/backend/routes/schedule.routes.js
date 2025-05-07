const { Router } = require('express');
const scheduleController = require('../controllers/schedule.controller');
const { isUserAuthenticated, isAdminAuthenticated } = require('../middlewares/auth.middleware');

const router = Router();

router.get("/", isUserAuthenticated, scheduleController.getSchedules);
router.post("/add", isUserAuthenticated, scheduleController.addSchedule);

module.exports = router;



