const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Email ou mot de passe invalide." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ message: "Email ou mot de passe invalide." });
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
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Connexion impossible." });
    }
};

const register = async (req, res, next) => {
    const { email, password, firstName, lastName, phone } = req.body;

    try {
        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            res.status(400).json({
                message:
                    "Cette adresse e-mail est déjà utilisée, veuillez en choisir une autre.",
            });
            return;
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
            res.status(400).json({
                message: "Impossible de créer l'utilisateur.",
            });
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message:
                    "Impossible de récupérer les données de l'utilisateur.",
            });
        });
};

const updateUser = (req, res) => {
    const userId = req.auth.id;
    const newData = req.body;
    User.updateOne({ _id: userId }, { ...newData })
        .then(() => res.status(200).json({ message: "Utilisateur modifié." }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de modifier l'utilisateur.",
            });
        });
};

const deleteUser = (req, res) => {
    const paramId = req.params.id;
    const authId = req.auth.id;

    if (paramId !== authId) {
        res.status(401).json({ message: "Non autorisé." });
        return;
    }

    User.deleteOne({ _id: authId })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé." }))
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                message: "Impossible de supprimer le compte.",
            });
        });
};

module.exports = { login, register, getOneUser, updateUser, deleteUser };
