const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    toUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    status : {
        type : String,
        enum : {
            values : ['interested','ignored', 'accepted', 'rejected'],
            message : '{VALUE} is invalid'
        }
    }
})
connectionSchema.index({toUserId: 1, fromUserId: 1}) // this will speed up the query of toUserId and fromUserId
                                                    // the 1 indicates index in ascending order

// The .pre() method in Mongoose is used to define a pre hook (also called a middleware).
// It runs before a certain Mongoose operation happens on a document.
connectionSchema.pre('Save', function(next) {
    // code
    // also dont forget to call next() as this act as a middleware
    next()
})
const ConnectionRequest = mongoose.model('ConnectionRequest', connectionSchema);

module.exports = ConnectionRequest;

// The .pre() method in Mongoose is used to define a pre hook (also called a middleware).
// It runs before a certain Mongoose operation happens on a document.

// event is the lifecycle stage you want to hook into (e.g., 'save', 'validate', 'remove', 
// 'findOneAndUpdate').