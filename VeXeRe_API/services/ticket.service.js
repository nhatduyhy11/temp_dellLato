const { Trip } = require("../models/trip.model");
const { Seat } = require("../models/seat.model");
const { Ticket } = require("../models/ticket.model");
const { sendBookTicketEmail } = require("../email/sendBookTicketEmail");

//book ticket = create ticket
//body (DTO): seatCodes, tripId
//token => userId

module.exports.createTicket = (req, res, next) => {
  const userId = req.user._id;
  const { tripId, seatCodes } = req.body;

  Trip.findById(tripId)
    .then((trip) => {
      if (!trip)
        return Promise.reject({
          status: 404,
          message: "Trip Not Found",
        });

      // trip.seats => availableSeatCodes
      const availableSeatCodes = trip.seats
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.code);

      // seatCodes <====> availableSeatCodes
      const errSeatCodes = [];
      seatCodes.forEach((code) => {
        if (availableSeatCodes.indexOf(code) === -1) errSeatCodes.push(code);
      });

      if (errSeatCodes.length > 0)
        return Promise.reject({
          status: 400,
          message: `Seats ${errSeatCodes.join(", ")} is/are not available`,
        });

      seatCodes.forEach((code) => {
        const index = trip.seats.findIndex((seat) => seat.code === code);
        trip.seats[index].isBooked = true;
      });

      return Promise.all([
        Ticket.create({
          tripId,
          userId,
          seats: seatCodes.map((code) => new Seat({ code })),
          totalPrice: seatCodes.length * trip.price,
        }),
        trip.save(),
      ]);
    })
    .then((result) => {
      //Detructuring for Array
      const [ticket, trip] = result;

      sendBookTicketEmail(req.user.email);

      return res.status(200).json(ticket);
    })
    .catch((err) => res.json(err));
};
