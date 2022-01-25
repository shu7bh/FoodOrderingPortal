import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel  } from "@mui/material";

const VendorRegister = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [openingTime, setOpeningTime] = useState("08:00");
    const [closingTime, setClosingTime] = useState("08:00");

    const onChangeName = (event) => { setName(event.target.value); };
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeShopName = (event) => { setShopName(event.target.value); }
    const onChangeOpeningTime = (event) => { setOpeningTime(event.target.value); }
    const onChangeClosingTime = (event) => { setClosingTime(event.target.value); }

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            shopName: shopName,
            openingTime: openingTime,
            closingTime: closingTime
        };

        axios
            .post("http://localhost:4000/vendor/register", newUser)
            .then((response) => {
                alert("Created\t" + response.data.name);
                localStorage.setItem("user", newUser.email);
                navigate("/vendor/dashboard");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={onChangeContact}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                    label="Shop Name"
                    variant="outlined"
                    value={shopName}
                    onChange={onChangeShopName}
                />
            </Grid>
        <Grid item xs={12}>
            <TextField
                type="time"
                label="Opening Time"
                variant="outlined"
                value={openingTime}
                onChange={onChangeOpeningTime}
                sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    type="time"
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
                    Register
                </Button>
            </Grid>
        </Grid>
    );
};

export default VendorRegister;
