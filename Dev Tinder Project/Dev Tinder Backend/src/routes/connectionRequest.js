const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');
const { userAuth } = require('../middlewares/auth-middlewares');
const User = require('../models/user');

const connectionRouter = express.Router()

connectionRouter.post('/request/send/:status/:toUserId', userAuth, async(req, res) => {
    try {
        const status = req.params.status;
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id

        const acceptedStatuses = ['ignored','interested']
        if (!acceptedStatuses.includes(status)) {
            throw new Error('invalid status');
        }
        if (toUserId.toString() === fromUserId.toString()) {
            throw new Error('request not valid');
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error('request not valid');
        }
        
        // const isConnectionExist = await ConnectionRequest.findOne({toUserId: toUserId, fromUserId : fromUserId});
        // if (isConnectionExist !== null) {
        //     throw new Error('invalid request')
        // }

        // const isReverseConnectionExist = await ConnectionRequest.findOne({fromUserId : toUserId, toUserId : fromUserId});
        // if (isReverseConnectionExist !== null) {
        //     throw new Error('Invalid request')
        // }
        // the above method we can write as together 
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        // here suppose we have 10000 users and these users may call 10 APIs and we have many documents
        // in our collection so while we are making an query it will take long time for the query
        // here comes the concept on indexing, suppose we are querying my firstName and we can index or
        // first name and the querying will be very fast
        // also the fields which we set unique are automatically indexed by mongo DB
        // so here fromUserId and toUserId is quried many times so we can index it 
        // here we have to index more than one field so that it is known as compound indexing
        // now in the schema page we can see how we write indexing, its very simple
        if (existingConnectionRequest) {
            throw new Error('Invalid connection')
        }
        const request = new ConnectionRequest({fromUserId, toUserId, status});
        const data =  await request.save();

        res.json({message : `${req.user.firstName} ${status} ${toUser.firstName}`, data,});

    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
    
})



connectionRouter.post('/request/review/:status/:requestedId', userAuth, async(req, res) => {
    try {
        const {status, requestedId} = req.params;
        const loginedUser = req.user;
        const allowedStatuses = ['accepted', 'rejected'];
        if (!allowedStatuses.includes(status)) {
            throw new Error('Invalid status');
        }
        const findUser = await ConnectionRequest.findOne({
            fromUserId : requestedId,
            toUserId : loginedUser._id,
            status : 'interested'
        })
        if(!findUser) {
            throw new Error('Invalid request');
        }
        findUser.status = status;
        const data = await findUser.save();
        const requestedUser = await User.findById(requestedId)
        res.json({message : `${loginedUser.firstName} ${status} ${requestedUser.firstName}`, data,});
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})
module.exports = connectionRouter;

// there is also a function called schema.pre like schema.methods which will work every time when
// before we save an data to DB