const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    default: "user",
  },
  lastlogin: {
    type: Date,
  },
  loginCount: {
    type: Number,
    default: 0, // Initialize with 0
  },
});
// Signup logic (unchanged)
UserSchema.statics.signup = async function (name, email, password, gender) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw Error("User Already Exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    return user;
  }
};

// Signin logic with login count update
UserSchema.statics.signin = async function (email, password) {
  const existingUser = await this.findOne({ email });

  if (!existingUser) {
    throw Error("User Not Exists");
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    existingUser.lastlogin = Date.now(); // Update last login date
    existingUser.loginCount += 1; // Increment login count
    await existingUser.save();
    return existingUser;
  } else {
    throw Error("Check Password and Try Again");
  }
};

module.exports = mongoose.model("user", UserSchema);
