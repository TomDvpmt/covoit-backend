import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUserId } from "../../../features/user/userSlice";

import RideInputLocation from "../../form-inputs/RideInputLocation";
import RideInputDepartureDate from "../../form-inputs/RideInputDepartureDate";
import RideInputSeats from "../../form-inputs/RideInputSeats";
import RideInputPrice from "../../form-inputs/RideInputPrice";

import { Collapse, Box, Button } from "@mui/material";

import PropTypes from "prop-types";

const CreateRideForm = ({ showCreateRideForm, setShowCreateRideForm }) => {
    CreateRideForm.propTypes = {
        showCreateRideForm: PropTypes.bool.isRequired,
        setShowCreateRideForm: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [seats, setSeats] = useState(0);
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            driverId: userId,
            departure,
            destination,
            departureDate,
            totalSeats: seats,
            price,
            passengers: [],
        };

        fetch("/API/rides/create", {
            method: "POST",
            headers: {
                Authorization: `BEARER ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                setDeparture("");
                setDestination("");
                setDepartureDate(Date.now());
                setSeats(0);
                setPrice(0);
                setShowCreateRideForm(false);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Collapse in={showCreateRideForm}>
            <Box component="form" onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: ".5rem",
                        alignItems: "center",
                    }}>
                    <RideInputLocation
                        type="departure"
                        location={departure}
                        setLocation={setDeparture}
                    />
                    <RideInputLocation
                        type="destination"
                        location={destination}
                        setLocation={setDestination}
                    />
                    <RideInputDepartureDate
                        departureDate={departureDate}
                        setDepartureDate={setDepartureDate}
                    />
                    <RideInputSeats
                        type="total"
                        seats={seats}
                        setSeats={setSeats}
                    />
                    <RideInputPrice
                        type="fixed"
                        price={price}
                        setPrice={setPrice}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Valider
                </Button>
            </Box>
        </Collapse>
    );
};

export default CreateRideForm;
