const mongoose = require("mongoose");

const bookingRequestSchema = mongoose.Schema(
    {
        rideId: { type: String },
        candidateId: { type: String },
        candidateFirstName: { type: String },
        candidateLastName: { type: String },
        candidateEmail: { type: String },
        driverId: { type: String },
        driverFirstName: { type: String },
        driverLastName: { type: String },
        driverEmail: { type: String },
        departure: { type: String },
        destination: { type: String },
        departureDate: { type: Number },
        status: { type: String, default: "pending" }, // pending, accepted, or rejected
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
