const WHITE_LIST = ["http://localhost:4200", "https://covoit.onrender.com"]; // important : no "/" at the end

const corsOptions = {
    origin: (origin, callback) => {
        if (WHITE_LIST.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(console.error("Requête bloquée par CORS."));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
};

module.exports = corsOptions;
