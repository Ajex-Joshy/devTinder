const express = require("express");
const { userAuth } = require("../middlewares/auth-middlewares");
const profileRouter = express.Router();
const { vlidateUpdatedData } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// update profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  // we will only allow user to edit firstName, lastName, phoneNo
  let loginUser = req.user;
  const allowedEditFields = [
    "firstName",
    "lastName",
    "phoneNo",
    "age",
    "about",
    "photoUrl",
    "gender",
  ];
  try {
    const { formData } = req.body;
    isUpdateAllowed = Object.keys(formData).every((k) =>
      allowedEditFields.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid Updates");
    }

    vlidateUpdatedData(req);

    Object.keys(formData).forEach((k) => {
      loginUser[k] = formData[k];
    });
    await loginUser.save();
    res.json({
      message: `${loginUser.firstName}, your profile has been updated`,
      data: loginUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update password

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new Error("Invalid Entry");
    }
    const loginUser = req.user;
    const isOldPassCorrect = await bcrypt.compare(
      oldPassword,
      loginUser.password
    );
    if (!isOldPassCorrect) {
      throw new Error("Old password doesnt match");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Password doesnt match");
    }
    console.log(loginUser);
    const passwordHash = await bcrypt.hash(newPassword, 10);
    loginUser.password = passwordHash;
    await loginUser.save();
    res.json({
      message: `${loginUser.firstName}, your password is successfully changed.`,
      data: loginUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
