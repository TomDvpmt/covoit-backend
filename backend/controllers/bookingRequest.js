const BookingRequest = require("../models/BookingRequest");
const { sendDemandToDriver } = require("../utils/mailing");

const createBookingRequest = (req, res) => {
    BookingRequest.create(req.body)
        .then(() => {
            const requestAuthorName = `${req.body.senderFirstName} ${req.body.senderLastName}`;
            sendDemandToDriver({
                driverEmail: req.body.driverEmail,
                requestAuthorName,
                departure: req.body.departure,
                destination: req.body.destination,
                formatedDate: req.body.departureDate,
            })
                .then((data) => console.log("data : ", data))
                .catch((error) => {
                    console.error(error);
                });
        })
        .then(() =>
            res.status(201).json({ message: "Demande de réservation créée." })
        )
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de créer la demande de réservation.",
            });
        });
};

const getAllBookingRequest = (req, res) => {
    const userId = req.auth.id;

    BookingRequest.find({
        $or: [{ senderId: userId }, { driverId: userId }],
    })
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de récupérer les demandes de réservation.",
            });
        });
};

const getOneBookingRequest = (req, res) => {
    const filter = req.body;

    BookingRequest.findOne(filter)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de récupérer la demande de réservation.",
            });
        });
};

const updateBookingRequest = (req, res) => {
    const requestId = req.params.id;
    const newRequestStatus = req.body.newRequestStatus;

    BookingRequest.updateOne({ _id: requestId }, { status: newRequestStatus })
        .then(() =>
            res
                .status(200)
                .json({ message: "Demande de réservation mise à jour." })
        )
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message:
                    "Impossible de mettre à jour la demande de réservation.",
            });
        });
};

const deleteBookingRequest = (req, res) => {
    const requestId = req.body.requestId;

    BookingRequest.deleteOne({ _id: requestId })
        .then(() =>
            res
                .status(200)
                .json({ message: "Demande de réservation supprimée." })
        )
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de supprimer la demande de réservation.",
            });
        });
};

module.exports = {
    createBookingRequest,
    getAllBookingRequest,
    getOneBookingRequest,
    updateBookingRequest,
    deleteBookingRequest,
};
