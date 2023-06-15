const Conversation = require("../models/Conversation");

const createConversation = (req, res) => {
    const users = req.body.users;
    const messages = req.body.messages;

    Conversation.create({
        users,
        messages,
    })
        .then((data) => {
            res.status(201).json({
                message: "Conversation créée.",
                conversation: data,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de créer la conversation.",
            });
        });
};

const getAllConversations = (req, res) => {
    const userId = req.auth.id;

    Conversation.find({ users: { $in: [userId] } })
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de récupérer les conversations.",
            });
        });
};

const getConversation = (req, res) => {
    const conversationId = req.params.id;

    Conversation.findOne({ _id: conversationId })
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                message: "Impossible d'afficher la conversation.",
            });
        });
};

const updateConversation = (req, res) => {
    const conversationId = req.params.id;
    const message = req.body;

    Conversation.updateOne(
        { _id: conversationId },
        { $push: { messages: message } }
    )
        .then(() =>
            res.status(200).json({ message: "Conversation mise à jour." })
        )
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de mettre à jour la conversation.",
            });
        });
};

const deleteConversation = (req, res) => {
    const conversationId = req.params.id;

    Conversation.deleteOne({ _id: conversationId })
        .then(() =>
            res.status(200).json({ message: "Conversation supprimée." })
        )
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de supprimer la conversation.",
            });
        });
};

module.exports = {
    createConversation,
    getAllConversations,
    getConversation,
    updateConversation,
    deleteConversation,
};
