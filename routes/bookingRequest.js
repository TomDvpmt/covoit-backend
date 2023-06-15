const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
    createBookingRequest,
    getAllBookingRequest,
    getOneBookingRequest,
    updateBookingRequest,
    deleteBookingRequest,
} = require("../controllers/bookingRequest");

router.post("/create", auth, createBookingRequest);
router.get("/", auth, getAllBookingRequest);
router.post("/", auth, getOneBookingRequest);
router.put("/:id", updateBookingRequest);
router.delete("/:id", deleteBookingRequest);

module.exports = router;
