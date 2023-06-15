const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
    driverId: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    departureDate: { type: Number, required: true },
    totalSeats: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    passengers: { type: Array, required: true },
});

module.exports = mongoose.model("Ride", rideSchema);
