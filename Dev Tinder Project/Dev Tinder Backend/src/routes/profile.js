const express = require('express');

const profileAuth = express.Router();

profileAuth.get('/profile/view')

module.exports = profileAuth;