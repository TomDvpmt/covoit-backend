const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_TOKEN_GENERATION_PHRASE
        );
        req.auth = { id: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Non autorisé." });
    }
};

module.exports = auth;
