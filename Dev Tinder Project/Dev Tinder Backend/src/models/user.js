const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name should have atleast 3 characters"],
      maxLength: [50, "First name should not exceed more than 50 characters"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("First name should only contain alphabets");
        }
      },
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name should have atleast 3 characters"],
      maxLength: [50, "Last name should not exceed more than 50 characters"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Last name should only contain alphabets");
        }
      },
    },
    phoneNo: {
      type: String,
      unique: [true, "This phone number already exists"],
      required: [true, "Phone number is required"],
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Enter a valid phone number");
        }
      },
    },
    emailId: {
      type: String,
      unique: [true, "This email id already exists"],
      required: [true, "Email is required"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email id");
        }
      },
    },
    age: {
      type: Number,
      required: ["true", "Age is required"],
      min: [15, "Minimum required age is 15"],
      max: [100, "Maximum allowed age is 100"],
    },
    about: {
      type: String,
      maxLength: [200, "About section should not exceed 200 characters"],
      default: "Hey there! I am using Dev Tinder.",
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid photo URL");
        }
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate(value) {
        if (!validator.isStrongPassword) {
          throw new Error("Enter a strong password");
        }
      },
    },
  },
  { timestamp: true }
);
// we will write our schema methods here before Wriring model
userSchema.methods.passwordCorrect = async function (password) {
  const value = await bcrypt.compare(password, this.password);
  return value;
};
userSchema.methods.getJWT = function () {
  // note we cannot use arrow function here as this is arrow refers to outer scope
  const token = jwt.sign({ _id: this._id }, "11@jersey$3978");
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
