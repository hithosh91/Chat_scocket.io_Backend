const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");
const dotenv = require("dotenv");
dotenv.config();

const key = process.env.KEY;

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, key);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error  protected route" });
  }
};
module.exports = { protectRoute };
