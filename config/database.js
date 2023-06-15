const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose
        .connect(
            `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() =>
            console.log("=== Connection to MongoDB Atlas successful. ===")
        )
        .catch((error) => {
            console.log("! Connection to MongoDB Atlas failed : ", error);
            process.exit(1);
        });
};

module.exports = connectToDb;
