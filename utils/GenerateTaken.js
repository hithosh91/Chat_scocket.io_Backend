const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const key = process.env.KEY;

const gettoken = (id, res) => {
  const token = jwt.sign({ id }, key, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent xss attact
    sameSite: "strict",
    secure: process.env.NODE_ENV != "development",
  });
};

module.exports = gettoken;
