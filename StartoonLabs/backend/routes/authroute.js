const express = require("express");
const authControllers = require("../Controller/userController");
const route = express.Router();
const User = require("../model/user");
//signup
route.post("/signup", authControllers.signup);
//login
route.post("/login", authControllers.login);
route.get("/user/:id", authControllers.getUserById);


// Admin route to get all users
route.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, 'name email loginCount lastlogin');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = route;