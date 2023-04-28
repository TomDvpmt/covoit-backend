const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({ message: "Email ou mot de passe invalide." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        res.status(401).json({ message: "Email ou mot de passe invalide." });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_TOKEN_GENERATION_PHRASE
    );

    res.status(200).json({
        message: "Utilisateur connecté.",
        id: user._id,
        token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
    });
};

const register = async (req, res, next) => {
    const { email, password, firstName, lastName, phone } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
        res.status(400).json({
            message:
                "Cette adresse e-mail est déjà utilisée, veuillez en choisir une autre.",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        phone,
    });

    if (!user) {
        res.status(400).json({ message: "Impossible de créer l'utilisateur." });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_TOKEN_GENERATION_PHRASE
    );
    res.status(201).json({
        message: "Utilisateur créé.",
        _id: user.id,
        token,
        email,
        firstName,
        lastName,
        phone,
    });
};

const getOneUser = (req, res) => {
    const authId = req.auth.id;
    const paramsId = parseInt(req.params.id);
    const userId = paramsId === 0 ? authId : paramsId;

    User.findOne({ _id: userId })
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                message:
                    "Impossible de récupérer les données de l'utilisateur.",
            });
        });
};

module.exports = { login, register, getOneUser };
