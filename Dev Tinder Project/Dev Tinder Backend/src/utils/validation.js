const validator = require("validator");
const validSignupData = (req) => {
  const { firstName, lastName, phoneNo, emailId, password } = req.body;

  if (!firstName || !lastName || !phoneNo || !password || !emailId) {
    throw new Error("Fields cannot be empty");
  }
  // other validations
};

const vlidateUpdatedData = (req) => {
  const { firstName, lastName, phoneNo } = req.body;
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
};
module.exports = {
  validSignupData,
  vlidateUpdatedData,
};
