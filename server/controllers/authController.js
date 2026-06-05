const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

   const role =
  email === "yasodhap0202@gmail.com"
    ? "admin"
    : "user";

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  phone,
  role,
});

    const token = jwt.sign(
      {
        id: user._id,
      },
      "nirvifySecretKey",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "nirvifySecretKey",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const updateProfile = async (req, res) => {

  try {

    const {
      email,
      phone,
      address,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.phone = phone;
    user.address = address;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};