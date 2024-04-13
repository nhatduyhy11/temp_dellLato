const { Trip } = require("../models/trip.model");
const { Seat } = require("../models/seat.model");

const seatCodeArray = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12",
];

module.exports.createTrip = (req, res, next) => {
  const { formStationId, toStationId, startTime, price } = req.body;

  const seats = seatCodeArray.map((code) => {
    return new Seat({
      code,
    });
  });

  //Mongoose: Trip.create = new Trip + save
  return Trip.create({
    formStationId,
    toStationId,
    startTime,
    price,
    seats,
  })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.json(err));
};

module.exports.getTrips = (req, res, next) => {
  return Trip.find()
    .then((trips) => {
      return res.status(200).json(trips);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.getTripsById = (req, res, next) => {
  const { tripId } = req.params;

  Trip.findById(tripId)
    .then((trip) => {
      if (!trip)
        return Promise.reject({
          status: 404,
          message: "Trip Not Found",
        });
      res.status(200).json(trip);
    })
    .catch((err) => res.json(err));
};
