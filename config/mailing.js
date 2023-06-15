const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
        user: process.env.MAILING_ADDRESS,
        pass: process.env.MAILING_PASSWORD,
    },
});

module.exports = transporter;
