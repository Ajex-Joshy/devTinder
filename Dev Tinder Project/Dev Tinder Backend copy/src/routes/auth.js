const express = require('express');

const authRouter = express.Router()
authRouter.post('/signup')
authRouter.post('login')

module.exports = authRouter;