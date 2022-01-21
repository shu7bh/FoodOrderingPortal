import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const BuyerRegister = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("20");
    const [batch, setBatch] = useState("UG1");

    const onChangeName = (event) => { setName(event.target.value); };
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeAge = (event) => { setAge(event.target.value); }
    const onChangeBatch = (event) => { setBatch(event.target.value); }

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setAge("20");
        setBatch("UG1");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            age: age,
            batch: batch
        };

        axios
            .post("http://localhost:4000/buyer/register", newUser)
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
                    label="Age"
                    variant="outlined"
                    type="number"
                    value={age}
                    onChange={onChangeAge}
                />
            </Grid>
            <Grid item xs={12}>
                <Select value={batch} onChange={onChangeBatch}>
                    <MenuItem value={"UG1"}>UG1</MenuItem>
                    <MenuItem value={"UG2"}>UG2</MenuItem>
                    <MenuItem value={"UG3"}>UG3</MenuItem>
                    <MenuItem value={"UG4"}>UG4</MenuItem>
                    <MenuItem value={"UG5"}>UG5</MenuItem>
                    <MenuItem value={"UG6"}>UG6</MenuItem>
                    <MenuItem value={"UG7"}>UG7</MenuItem>
                    <MenuItem value={"UG8"}>UG8</MenuItem>
                    <MenuItem value={"PG1"}>PG1</MenuItem>
                    <MenuItem value={"PG2"}>PG2</MenuItem>
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

export default BuyerRegister;
