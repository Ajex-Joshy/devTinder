const express = require("express");
const { validSignupData } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    // validating data
    validSignupData(req);
    // encrypting password
    const {
      firstName,
      lastName,
      age,
      phoneNo,
      emailId,
      gender,
      password,
      photoUrl,
      about,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      age,
      phoneNo,
      emailId,
      gender,
      password: passwordHash,
      about,
      photoUrl,
    });
    await user.save();
    const token = user.getJWT();
    res.cookie("token", token);
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Enter a valid emall Id");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const isPasswordCorrect = await user.passwordCorrect(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credential");
    }
    const token = user.getJWT();
    res.cookie("token", token);
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("user logged out");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
