const validator = require("validator");
const validSignupData = (req) => {
  const {
    firstName,
    lastName,
    phoneNo,
    emailId,
    age,
    about,
    photoUrl,
    gender,
    password,
    confirmPassword,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !phoneNo ||
    !emailId ||
    !password ||
    !confirmPassword ||
    !gender ||
    !age
  ) {
    throw new Error("All required fields must be provided");
  }

  if (firstName) {
    if (firstName.length < 3 || firstName.length > 50) {
      throw new Error("First name Should be 3 - 50 characters");
    }
  }
  if (lastName) {
    if (lastName.length < 3 || lastName.length > 50) {
      throw new Error("Last name Should be 3 - 50 characters");
    }
  }
  if (phoneNo) {
    if (!validator.isMobilePhone(phoneNo)) {
      throw new Error("Enter a valid phone number");
    }
  }

  if (age) {
    if (age < 15 || age > 100) {
      throw new Error("Age must be between 15 and 100");
    }
  }

  if (about) {
    if (about.length > 200) {
      throw new Error("About section should not exceed 200 characters");
    }
  }

  if (photoUrl) {
    if (!validator.isURL(photoUrl)) {
      throw new Error("Enter a valid photo URL");
    }
  }

  if (gender) {
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender)) {
      throw new Error("Gender must be male, female, or other");
    }
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};

const vlidateUpdatedData = (req) => {
  const { firstName, lastName, phoneNo, age, about, photoUrl } =
    req.body.formData;
  if (firstName) {
    if (firstName.length < 3 || firstName.length > 50) {
      throw new Error("First name Should be 3 - 50 characters");
    }
  }
  if (lastName) {
    if (lastName.length < 3 || lastName.length > 50) {
      throw new Error("Last name Should be 3 - 50 characters");
    }
  }
  if (phoneNo) {
    if (!validator.isMobilePhone(phoneNo)) {
      throw new Error("Enter a valid phone number");
    }
  }
  if (age) {
    if (age < 15 || age > 100) {
      throw new Error("Age must be between 15 and 100");
    }
  }

  if (about) {
    if (about.length > 200) {
      throw new Error("About section should not exceed 200 characters");
    }
  }

  if (photoUrl) {
    if (!validator.isURL(photoUrl)) {
      throw new Error("Enter a valid photo URL");
    }
  }
};
module.exports = {
  validSignupData,
  vlidateUpdatedData,
};
