const express = require("express");
const { userAuth } = require("../middlewares/auth-middlewares");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { connections } = require("mongoose");
const userConnection = express.Router();

userConnection.get("/connection/pending", userAuth, async (req, res) => {
  try {
    const loginedUser = req.user;
    const pendingRequest = await connectionRequest
      .find({
        toUserId: loginedUser._id,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName age gender about photoUrl");

    res.json({ pending: pendingRequest });
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

userConnection.get("/connections", userAuth, async (req, res) => {
  try {
    const loginedUser = req.user;
    const connections = await connectionRequest
      .find({
        $or: [
          { toUserId: loginedUser._id, status: "accepted" },
          { fromUserId: loginedUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", "firstName lastName age gender about photoUrl")
      .populate("toUserId", "firstName lastName  age gender about photoUrl");
    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() == loginedUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json({ data });
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

// now we will write the code for feed API
// but before think that which all users to show in feed
// people to whom did not sent request
// should not show if someone is ignored, alreay connected (accepted), his profile, already sent connection req (intrested)

userConnection.get("/feed", userAuth, async (req, res) => {
  try {
    const loginedUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    // Find all connection requests (sent + received)
    const connectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loginedUser._id }, { toUserId: loginedUser._id }],
      })
      .select("fromUserId toUserId");

    const blockedReq = new Set();
    connectionRequests.map((req) => {
      blockedReq.add(req.fromUserId.toString());
      blockedReq.add(req.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: [...Array.from(blockedReq), loginedUser._id] },
    })
      .select("-password")
      .skip(skip)
      .limit(limit);
    res.json({ feed: users });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userConnection;
