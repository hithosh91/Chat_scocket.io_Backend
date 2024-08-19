const express = require("express");
const mess = require("../controller/Messagectl");
const protect = require("../middleware/Protectroute");
const routes = express.Router();

routes.post("/send/:id", protect.protectRoute, mess.sendMessage);
routes.get("/:id", protect.protectRoute, mess.getMessage);

module.exports = routes;
