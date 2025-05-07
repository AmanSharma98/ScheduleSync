const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/authController');

router.post('/admin/login', adminLogin);

module.exports = router;
