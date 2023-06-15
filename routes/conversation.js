const express = require("express");
const auth = require("../middleware/auth");
const {
    getAllConversations,
    getConversation,
    createConversation,
    updateConversation,
    deleteConversation,
} = require("../controllers/conversation");

const router = express.Router();

router.get("/", auth, getAllConversations);
router.get("/:id", auth, getConversation);
router.post("/", auth, createConversation);
router.put("/:id", auth, updateConversation);
router.delete("/:id", auth, deleteConversation);

module.exports = router;
