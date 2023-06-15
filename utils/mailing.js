const transporter = require("../config/mailing");

const sender = `Covoit <${process.env.MAILING_ADDRESS}>`;

const sendPendingRequestMailToDriver = async (ride) => {
    const messageInfo = await transporter.sendMail({
        from: sender,
        to: ride.driverEmail,
        subject: "Demande de trajet",
        html: `
            <p><strong>${ride.candidateName}</strong> souhaite participer au voyage de <strong>${ride.departure}</strong> à <strong>${ride.destination}</strong> le ${ride.formatedDate}.</p>
            <p>Pour accepter ou rejeter cette demande, rendez-vous dans la rubrique "Demandes de réservation" de <strong>votre espace personnel</strong> sur Covoit.fr.</p>
        `,
    });

    return messageInfo;
};

const sendAcceptedRequestMailToCandidate = async (ride) => {
    const messageInfo = await transporter.sendMail({
        from: sender,
        to: ride.candidateEmail,
        subject: "Demande de trajet acceptée !",
        html: `
            <p><strong>${ride.driverName}</strong> a accepté votre participation au voyage de <strong>${ride.departure}</strong> à <strong>${ride.destination}</strong> le ${ride.formatedDate}.</p>
            <p>Retrouvez tous les détails du voyage dans la rubrique <strong>"Mes trajets"</strong> de votre espace personnel sur Covoit.fr</p>
        `,
    });

    return messageInfo;
};

const sendRejectedRequestMailToCandidate = async (ride) => {
    const messageInfo = await transporter.sendMail({
        from: sender,
        to: ride.candidateEmail,
        subject: "Demande de trajet rejetée",
        html: `
            <p><strong>${ride.driverName}</strong> n'a pas accepté votre participation au voyage de <strong>${ride.departure}</strong> à <strong>${ride.destination}</strong> le ${ride.formatedDate}.</p>
            <p>D'autres trajets vous attendent sur Covoit.fr !</p>
        `,
    });

    return messageInfo;
};

module.exports = {
    sendPendingRequestMailToDriver,
    sendAcceptedRequestMailToCandidate,
    sendRejectedRequestMailToCandidate,
};
