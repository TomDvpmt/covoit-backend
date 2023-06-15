const Ride = require("../models/Ride");

const getRides = (req, res) => {
    const filters = req.body.filters;
    Ride.find(filters)
        .then((results) => res.status(200).json({ results }))
        .catch((error) => {
            console.error(error);
            return res
                .status(400)
                .json({ message: "Impossible de récupérer les données." });
        });
};

const createRide = (req, res) => {
    const data = req.body;

    Ride.create(data)
        .then(() => res.status(201).json({ message: "Trajet créé.", data }))
        .catch((error) => {
            console.error(error);
            return res
                .status(400)
                .json({ message: "Impossible de créer le trajet." });
        });
};

const updateRide = (req, res) => {
    const rideId = req.params.id;
    const updateData = req.body;
    const newPassenger = req.body.newPassenger;

    Ride.updateOne(
        { _id: rideId },
        newPassenger ? { $addToSet: { passengers: newPassenger } } : updateData
    )
        .then(() => res.status(200).json({ message: "Trajet mis à jour." }))
        .catch((error) => {
            console.log(error);
            return res.status(400).json({
                message: "Impossible de mettre à jour le trajet.",
            });
        });
};

const deleteRide = (req, res) => {
    const rideId = req.params.id;

    Ride.deleteOne({ _id: rideId })
        .then(() => res.status(200).json({ message: "Trajet supprimé." }))
        .catch((error) => {
            console.log(error);
            return res.status(400).json({
                message: "Impossible de supprimer le trajet.",
            });
        });
};

module.exports = { getRides, createRide, updateRide, deleteRide };
