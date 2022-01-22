import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const VendorProfile = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("user"));
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [openingTime, setOpeningTime] = useState("08:00");
    const [closingTime, setClosingTime] = useState("08:00");

    const onChangeName = (event) => { setName(event.target.value); }
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeShopName = (event) => { setShopName(event.target.value); }
    const onChangeOpeningTime = (event) => { setOpeningTime(event.target.value); }
    const onChangeClosingTime = (event) => { setClosingTime(event.target.value); }

    useEffect(() => {
        axios .post("http://localhost:4000/vendor/getDetails", {email: email})
            .then((response) => {
                setName(response.data.name);
                setContact(response.data.contact);
                setShopName(response.data.shopName);
                setOpeningTime(response.data.openingTime);
                setClosingTime(response.data.closingTime);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    }, []);

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setShopName("");
        setOpeningTime("08:00");
        setClosingTime("08:00");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            shopName: shopName,
            openingTime: openingTime,
            closingTime: closingTime
        };

        axios
            .post("http://localhost:4000/vendor/login", user)
            .then((response) => {
                alert("Login Successful");
                resetInputs();
                navigate("/vendor/profile");
                localStorage.setItem("user", user.email);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={onChangeContact}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shopName}
                    onChange={onChangeShopName}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Opening Time"
                    variant="outlined"
                    value={openingTime}
                    onChange={onChangeOpeningTime}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Closing Time"
                    variant="outlined"
                    value={closingTime}
                    onChange={onChangeClosingTime}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default VendorProfile;
