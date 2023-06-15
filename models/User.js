const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "E-mail requis."],
            unique: true,
        },
        password: { type: String, required: [true, "Mot de passe requis."] },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
