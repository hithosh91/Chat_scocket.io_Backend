const user = require("../models/Usermodel");

const getUserSidebar = async (req, res) => {
  try {
    const loginuser = req.user._id;

    const alluserExceptLoginuse = await user
      .find({ _id: { $ne: loginuser } })
      .select("-password");

    res.status(200).json(alluserExceptLoginuse);
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ error: "error while getting all user data" });
  }
};

module.exports = { getUserSidebar };
