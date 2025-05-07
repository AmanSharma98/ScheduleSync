const { Router } = require("express");
const usercontroller = require("../controllers/user.controller");
const usergetprofile=require("../controllers/user.getprofile")
const router = Router();

router.get("/get-users", usercontroller.getUsers);
router.post("/login", usercontroller.login);
router.post("/register", usercontroller.register);

module.exports = router;
