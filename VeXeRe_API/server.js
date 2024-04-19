const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const { MONGO_URL } = require("./config");

const stationController = require("./controller/station.controller");
const tripController = require("./controller/trip.controller");
const userController = require("./controller/user.controller");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to database successfully");
  })
  .catch(console.log);

const app = express();
app.use(cors());

app.use(express.json());
app.use("/images", express.static("images"));

const port = process.env.PORT || 5000;

app.use("/api", stationController);
app.use("/api", tripController);
app.use("/api/users", userController);
app.use("/api", require("./controller/ticket.controller"));

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
