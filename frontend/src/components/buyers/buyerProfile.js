import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel } from "@mui/material";

const BuyerProfile = (props) => {

    const [name, setName] = useState("");
    const [email] = useState(localStorage.getItem("user"));
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    const [editOn, setEditOn] = useState(false);

    const [savedName, setSavedName] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    const [savedContact, setSavedContact] = useState("");
    const [savedAge, setSavedAge] = useState("");
    const [savedBatch, setSavedBatch] = useState("");

    const onChangeName = (event) => { setName(event.target.value); }
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeAge = (event) => { setAge(event.target.value); }
    const onChangeBatch = (event) => { setBatch(event.target.value); }
    const onEditToggle = (event) => { setEditOn(!editOn) }

    useEffect(() => {
        axios.post("/api/buyer/getDetails", {email: email})
            .then((response) => {
                setName(response.data.name);
                setPassword(response.data.password);
                setContact(response.data.contact);
                setAge(response.data.age);
                setBatch(response.data.batch);
                setSavedName(response.data.name);
                setSavedPassword(response.data.password);
                setSavedContact(response.data.contact);
                setSavedAge(response.data.age);
                setSavedBatch(response.data.batch);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    }, [email]);

    const resetInputs = () => {
        setName(savedName);
        setPassword(savedPassword);
        setContact(savedContact);
        setAge(savedAge);
        setBatch(savedBatch);
        setEditOn(false);
    };

    const onCancel = (event) => {
        resetInputs();
        setEditOn(false);
    }

    const onSave = (event) => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            age: age,
            batch: batch
        };

        axios
            .post("/api/buyer/update", user)
            .then((response) => {
                setSavedName(name);
                setSavedPassword(password);
                setSavedContact(contact);
                setSavedAge(age);
                setSavedBatch(batch);
                setEditOn(false);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    };

    return (
        <Grid container align={"center"} spacing={0}>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={onChangeName}
                        disabled={!editOn}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        disabled={true}
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
                        disabled={!editOn}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contact Number"
                        variant="outlined"
                        value={contact}
                        onChange={onChangeContact}
                        disabled={!editOn}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        type="number"
                        value={age}
                        onChange={onChangeAge}
                        disabled={!editOn}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel> Batch </InputLabel>
                        <Select
                            value={batch}
                            onChange={onChangeBatch}
                            disabled={!editOn}
                            sx = {{ minWidth: "400px", minHeight: "60px" }}
                        >
                            <MenuItem value={""}> <em>None</em> </MenuItem>
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
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
            {
                editOn ?
                (
                    <Grid container align={"center"} spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={onSave}
                                sx = {{ minWidth: "400px", minHeight: "60px" }}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={onCancel}
                                sx = {{ minWidth: "400px", minHeight: "60px" }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                )
                :
                (
                    <Grid container align={"center"} spacing={0}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={onEditToggle}
                                sx = {{ minWidth: "400px", minHeight: "60px" }}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    );
};

export default BuyerProfile;
