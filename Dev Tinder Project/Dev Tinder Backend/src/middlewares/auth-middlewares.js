const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async(req, res, next)=> {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Invalid token');
        }
        const { _id } = jwt.verify(token, "11@jersey$3978")
        const user = await User.findById(_id)
        if (!user) {
            throw new Error('login again!');
        }
        req.user = user;
        next();
    } catch (err) {
        res.send('ERROR: ' + err.message)
    }
    

}

module.exports = {
    userAuth
}