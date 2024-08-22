const User = require("../model/user");
const jwt = require("jsonwebtoken");

//token generation
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, "PasswordHashing", {
    expiresIn: "2d",
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.signin(email, password);

    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  try {
    const user = await User.signup(name, email,password,gender);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await User.findById(id);

    res.status(201).json({
      res: response,
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

module.exports = {
  signup,
  login,
  getUserById,
};