const usermodel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const genertetoken = require("../utils/GenerateTaken");

const LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const finduser = await usermodel.findOne({ username });
    const ispasswordcheck = await bcrypt.compare(
      password,
      finduser?.password || " "
    );

    if (!finduser || !ispasswordcheck) {
      return res.status(400).json({ error: "invalid details" });
    }

    genertetoken(finduser._id, res);

    res.status(200).json({
      _id: finduser._id,
      fullName: finduser.fullName,
      username: finduser.username,
      profilePic: finduser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server errror" });
  }
};
const SignUser = async (req, res) => {
  const { fullName, password, profilePic, username, gender, confirmPassword } =
    req.body;

  try {
    //VALIDATIION PASSWORD

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password doesnot match" });
    }

    //validate user already exist

    const user = await usermodel.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "user already register" });
    }
    //hassing

    const salt = await bcrypt.genSalt(10);
    const hashpswword = await bcrypt.hash(password, salt);
    //create profile pictire

    const boyprofile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new usermodel({
      fullName,
      password: hashpswword,
      username,
      gender,
      profilePic: gender === "male" ? boyprofile : girlprofile,
    });

    if (newUser) {
      genertetoken(newUser._id, res);
      await newUser.save();
    }

    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server errror" });
  }
};
const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ json: "logout function issue" });
  }
};

module.exports = { LoginUser, SignUser, Logout };
