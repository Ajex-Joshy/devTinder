// here we will implement schema methods, express routers, new APIs
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/connectionRequest");
const userConnection = require("./routes/user");
const cors = require("cors");

const app = express();

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Ajex-Joshy:FonUd33RyCVddHSi@namaste-nodejs.qn17tbf.mongodb.net/devTinder"
  );
};
const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connection established successfully");
    app.listen(3000, () =>
      console.log("server successfully listening on port: 3000")
    );
  } catch (err) {
    console.log("error connecting to DB");
  }
};
startServer();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/", profileRouter);
app.use(connectionRouter);
app.use(userConnection);
