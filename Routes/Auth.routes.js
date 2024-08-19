const express = require("express");
const ctl = require("../controller/Auth.controller");
const router = express.Router();

router.post("/signup", ctl.SignUser);

router.post("/login", ctl.LoginUser);
router.post("/logout", ctl.Logout);

module.exports = router;
