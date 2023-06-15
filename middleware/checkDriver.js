const Ride = require("../models/Ride");

const checkDriver = async (req, res, next) => {
    const userId = req.auth.id;
    const rideId = req.params.id;
    try {
        const ride = await Ride.findOne({ _id: rideId });
        if (ride.driverId !== userId) {
            return res.status(401).json({ message: "Non autorisé." });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Opération impossible." });
    }
};

module.exports = checkDriver;
