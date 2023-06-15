const express = require("express");
const auth = require("../middleware/auth");
const checkDriver = require("../middleware/checkDriver");
const {
    createRide,
    getRides,
    deleteRide,
    updateRide,
} = require("../controllers/ride");

const router = express.Router();

router.post("/create", auth, createRide);
router.post("/", getRides);
router.put("/:id", auth, updateRide);
router.delete("/:id", auth, checkDriver, deleteRide);

module.exports = router;
