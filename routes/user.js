const express = require("express");
const router = express.Router();
const {
    login,
    register,
    getOneUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/:id", getOneUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
