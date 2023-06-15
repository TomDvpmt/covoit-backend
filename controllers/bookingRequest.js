const BookingRequest = require("../models/BookingRequest");
const {
    sendPendingRequestMailToDriver,
    sendAcceptedRequestMailToCandidate,
    sendRejectedRequestMailToCandidate,
} = require("../utils/mailing");

const createBookingRequest = (req, res) => {
    BookingRequest.create(req.body)
        .then(() => {
            const candidateName = `${req.body.candidateFirstName} ${req.body.candidateLastName}`;
            const date = new Date(req.body.departureDate);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formatedDay = date.toLocaleDateString("fr");
            const formatedTime = `${hours < 10 ? 0 : ""}${hours}h${
                minutes < 10 ? 0 : ""
            }${minutes}`;
            sendPendingRequestMailToDriver({
                driverEmail: req.body.driverEmail,
                candidateName,
                departure: req.body.departure,
                destination: req.body.destination,
                formatedDate: `${formatedDay} à ${formatedTime}`,
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
        $or: [{ candidateId: userId }, { driverId: userId }],
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
        .then(() => {
            if (newRequestStatus === "accepted") {
                sendAcceptedRequestMailToCandidate({
                    candidateEmail: req.body.candidateEmail,
                    driverName: req.body.driverName,
                    departure: req.body.departure,
                    destination: req.body.destination,
                    formatedDate: req.body.formatedDate,
                });
            }
            if (newRequestStatus === "rejected") {
                sendRejectedRequestMailToCandidate({
                    candidateEmail: req.body.candidateEmail,
                    driverName: req.body.driverName,
                    departure: req.body.departure,
                    destination: req.body.destination,
                    formatedDate: req.body.formatedDate,
                });
            }
        })
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
