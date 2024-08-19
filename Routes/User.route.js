const user = require("../controller/UserSidebar");
const middle = require("../middleware/Protectroute");
const express = require("express");

const router = express.Router();

router.get("/", middle.protectRoute, user.getUserSidebar);

module.exports = router;
