const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/database");
const userRoutes = require("./routes/user");
const rideRoutes = require("./routes/ride");
const bookingRequestRoutes = require("./routes/bookingRequest");
const conversationsRoutes = require("./routes/conversation");

connectToDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/API/users", userRoutes);
app.use("/API/rides", rideRoutes);
app.use("/API/bookingRequests", bookingRequestRoutes);
app.use("/API/conversations", conversationsRoutes);

module.exports = app;
