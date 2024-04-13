const express = require("express");
const { createTrip, getTrips, getTripsById } = require("../services/trip.service");

const router = express.Router();

router.get("/trips", getTrips);
router.get("/trips/:tripId", getTripsById);
router.post("/trips", createTrip);

module.exports = router;
