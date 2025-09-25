const express = require('express');
const { connectDB } = require('./config/database')
const User = require('./models/user')
const app = express();
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile');

connectDB()
.then(() => {
    console.log('Database connection establised successfully');
    app.listen(3000, () => console.log('server successfully listening on port: 3000'));
})
.catch(() => console.log('failed to connect DB'))

app.use('/',authRouter);
app.use('/',profileRouter);


