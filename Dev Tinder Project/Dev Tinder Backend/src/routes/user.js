const express = require('express');
const { userAuth } = require('../middlewares/auth-middlewares')
const connectionRequest = require('../models/connectionRequest')
const User = require('../models/user');
const { connections } = require('mongoose');
const userConnection = express.Router()


userConnection.get('/connection/pending', userAuth, async (req, res) => {
    try {
        const loginedUser = req.user;
        const pendingRequest = await connectionRequest.find({
            toUserId : loginedUser._id,
            status : 'interested'
        }).populate('fromUserId', 'firstName lastName')

        res.json({pending: pendingRequest})
        
    } catch (err) {
       res.send('ERROR: ' + err.message);
    }
})

userConnection.get('/connections', userAuth, async(req, res) => {
    try {
        const loginedUser = req.user;
        const connections = await connectionRequest.find({
            $or: [
                {toUserId : loginedUser._id, status: 'accepted'},
                {fromUserId: loginedUser._id, status: 'accepted'}
            ]
        }).populate('fromUserId', 'firstName lastName').populate('toUserId', 'firstName lastName')

        console.log(connections)
        const data = connections.map(row => {
            if (row.fromUserId._id.toString() == loginedUser._id.toString()) {
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        })
        res.json({data,})
    } catch (err) {
        res.send('ERROR: ' + err.message);
    }
})

// now we will write the code for feed API 
// but before think that which all users to show in feed
// people to whom did not sent request
// should not show if someone is ignored, alreay connected (accepted), his profile, already sent connection req (intrested)

userConnection.get('/feed', userAuth, async(req, res) => {
    try {
        const loginedUser = req.user;
        const feed = await connectionRequest.find({
            $nor :[
                { fromUserId : loginedUser._id, status : 'ignored'},
                { fromUserId : loginedUser._id, status : 'accepted'}
            ]
        })
        res.json({feed,})
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

module.exports = userConnection;