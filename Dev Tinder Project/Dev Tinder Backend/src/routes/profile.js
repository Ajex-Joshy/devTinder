const express = require('express')
const { userAuth } = require('../middlewares/auth-middlewares')
const profileRouter = express.Router()
const {vlidateUpdatedData} = require('../utils/validation')
const bcrypt = require('bcrypt');


profileRouter.get('/profile/view', userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send('Welcome ' + user.firstName);
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

// update profile
profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
    // we will only allow user to edit firstName, lastName, phoneNo
    const allowedEditFields = ['firstName', 'lastName', 'phoneNo'];
    try {

        isUpdateAllowed =  Object.keys(req.body).every(k => allowedEditFields.includes(k));
        if(!isUpdateAllowed) {
            throw new Error('Invalid Updates')
        }
        vlidateUpdatedData(req);
        const loginUser = req.user;
        const data = req.body;
        Object.keys(req.body).forEach( k => loginUser[k] = req.body[k]);
        await loginUser.save();
        res.json({message : `${loginUser.firstName}, your profile has been updated`, data : loginUser});
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }

})

// update password

profileRouter.patch('/profile/password', userAuth, async(req,res) => {
    try {
        const {oldPassword, newPassword, confirmPassword} = req.body
        if(!oldPassword || !newPassword || !confirmPassword) {
            throw new Error('Invalid Entry')
        }
        const loginUser = req.user;
        const isOldPassCorrect = await bcrypt.compare(oldPassword,loginUser.password)
        if (!isOldPassCorrect) {
            throw new Error('Old password doesnt match')
        }
        if (newPassword !== confirmPassword) {
            throw new Error('Password doesnt match');
        }
        console.log(loginUser)
        const passwordHash = await bcrypt.hash(newPassword,10);
        loginUser.password = passwordHash;
        await loginUser.save()
        res.json({message : `${loginUser.firstName}, your password is successfully changed.`, data : loginUser});

    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})


module.exports = profileRouter;