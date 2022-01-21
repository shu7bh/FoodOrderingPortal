import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const VendorRegister = (props) => {
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
                console.log(response.data);
            });

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={onChangeContact}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shopName}
                    onChange={onChangeShopName}
                />
            </Grid>
            <Grid item xs={12}>
                <Select label="Opening Time" variant="outlined" value={openingTime} onChange={onChangeOpeningTime}>
                    <MenuItem value="00:00">00:00</MenuItem>
                    <MenuItem value="00:30">00:30</MenuItem>
                    <MenuItem value="01:00">01:00</MenuItem>
                    <MenuItem value="01:30">01:30</MenuItem>
                    <MenuItem value="02:00">02:00</MenuItem>
                    <MenuItem value="02:30">02:30</MenuItem>
                    <MenuItem value="03:00">03:00</MenuItem>
                    <MenuItem value="03:30">03:30</MenuItem>
                    <MenuItem value="04:00">04:00</MenuItem>
                    <MenuItem value="04:30">04:30</MenuItem>
                    <MenuItem value="05:00">05:00</MenuItem>
                    <MenuItem value="05:30">05:30</MenuItem>
                    <MenuItem value="06:00">06:00</MenuItem>
                    <MenuItem value="06:30">06:30</MenuItem>
                    <MenuItem value="07:00">07:00</MenuItem>
                    <MenuItem value="07:30">07:30</MenuItem>
                    <MenuItem value="08:00">08:00</MenuItem>
                    <MenuItem value="08:30">08:30</MenuItem>
                    <MenuItem value="09:00">09:00</MenuItem>
                    <MenuItem value="09:30">09:30</MenuItem>
                    <MenuItem value="10:00">10:00</MenuItem>
                    <MenuItem value="10:30">10:30</MenuItem>
                    <MenuItem value="11:00">11:00</MenuItem>
                    <MenuItem value="11:30">11:30</MenuItem>
                    <MenuItem value="12:00">12:00</MenuItem>
                    <MenuItem value="12:30">12:30</MenuItem>
                    <MenuItem value="13:00">13:00</MenuItem>
                    <MenuItem value="13:30">13:30</MenuItem>
                    <MenuItem value="14:00">14:00</MenuItem>
                    <MenuItem value="14:30">14:30</MenuItem>
                    <MenuItem value="15:00">15:00</MenuItem>
                    <MenuItem value="15:30">15:30</MenuItem>
                    <MenuItem value="16:00">16:00</MenuItem>
                    <MenuItem value="16:30">16:30</MenuItem>
                    <MenuItem value="17:00">17:00</MenuItem>
                    <MenuItem value="17:30">17:30</MenuItem>
                    <MenuItem value="18:00">18:00</MenuItem>
                    <MenuItem value="18:30">18:30</MenuItem>
                    <MenuItem value="19:00">19:00</MenuItem>
                    <MenuItem value="19:30">19:30</MenuItem>
                    <MenuItem value="20:00">20:00</MenuItem>
                    <MenuItem value="20:30">20:30</MenuItem>
                    <MenuItem value="21:00">21:00</MenuItem>
                    <MenuItem value="21:30">21:30</MenuItem>
                    <MenuItem value="22:00">22:00</MenuItem>
                    <MenuItem value="22:30">22:30</MenuItem>
                    <MenuItem value="23:00">23:00</MenuItem>
                    <MenuItem value="23:30">23:30</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select label="Closing Time" variant="outlined" value={closingTime} onChange={onChangeClosingTime}>
                    <MenuItem value="00:00">00:00</MenuItem>
                    <MenuItem value="00:30">00:30</MenuItem>
                    <MenuItem value="01:00">01:00</MenuItem>
                    <MenuItem value="01:30">01:30</MenuItem>
                    <MenuItem value="02:00">02:00</MenuItem>
                    <MenuItem value="02:30">02:30</MenuItem>
                    <MenuItem value="03:00">03:00</MenuItem>
                    <MenuItem value="03:30">03:30</MenuItem>
                    <MenuItem value="04:00">04:00</MenuItem>
                    <MenuItem value="04:30">04:30</MenuItem>
                    <MenuItem value="05:00">05:00</MenuItem>
                    <MenuItem value="05:30">05:30</MenuItem>
                    <MenuItem value="06:00">06:00</MenuItem>
                    <MenuItem value="06:30">06:30</MenuItem>
                    <MenuItem value="07:00">07:00</MenuItem>
                    <MenuItem value="07:30">07:30</MenuItem>
                    <MenuItem value="08:00">08:00</MenuItem>
                    <MenuItem value="08:30">08:30</MenuItem>
                    <MenuItem value="09:00">09:00</MenuItem>
                    <MenuItem value="09:30">09:30</MenuItem>
                    <MenuItem value="10:00">10:00</MenuItem>
                    <MenuItem value="10:30">10:30</MenuItem>
                    <MenuItem value="11:00">11:00</MenuItem>
                    <MenuItem value="11:30">11:30</MenuItem>
                    <MenuItem value="12:00">12:00</MenuItem>
                    <MenuItem value="12:30">12:30</MenuItem>
                    <MenuItem value="13:00">13:00</MenuItem>
                    <MenuItem value="13:30">13:30</MenuItem>
                    <MenuItem value="14:00">14:00</MenuItem>
                    <MenuItem value="14:30">14:30</MenuItem>
                    <MenuItem value="15:00">15:00</MenuItem>
                    <MenuItem value="15:30">15:30</MenuItem>
                    <MenuItem value="16:00">16:00</MenuItem>
                    <MenuItem value="16:30">16:30</MenuItem>
                    <MenuItem value="17:00">17:00</MenuItem>
                    <MenuItem value="17:30">17:30</MenuItem>
                    <MenuItem value="18:00">18:00</MenuItem>
                    <MenuItem value="18:30">18:30</MenuItem>
                    <MenuItem value="19:00">19:00</MenuItem>
                    <MenuItem value="19:30">19:30</MenuItem>
                    <MenuItem value="20:00">20:00</MenuItem>
                    <MenuItem value="20:30">20:30</MenuItem>
                    <MenuItem value="21:00">21:00</MenuItem>
                    <MenuItem value="21:30">21:30</MenuItem>
                    <MenuItem value="22:00">22:00</MenuItem>
                    <MenuItem value="22:30">22:30</MenuItem>
                    <MenuItem value="23:00">23:00</MenuItem>
                    <MenuItem value="23:30">23:30</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Register
                </Button>
            </Grid>
        </Grid>
    );
};

export default VendorRegister;
