const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    users: { type: Array },
    messages: { type: Array },
});

module.exports = mongoose.model("Conversation", conversationSchema);
