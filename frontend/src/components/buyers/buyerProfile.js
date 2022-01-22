import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const BuyerProfile = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("user"));
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

    const onChangeName = (event) => { if (editOn) setName(event.target.value); }
    const onChangePassword = (event) => { if (editOn) setPassword(event.target.value); }
    const onChangeContact = (event) => { if(editOn) setContact(event.target.value); }
    const onChangeAge = (event) => { if (editOn) setAge(event.target.value); }
    const onChangeBatch = (event) => { if (editOn) setBatch(event.target.value); }
    const onEditToggle = (event) => { setEditOn(!editOn) }

    useEffect(() => {
        axios .post("http://localhost:4000/buyer/getDetails", {email: email})
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
    }, []);

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
            .post("http://localhost:4000/buyer/update", user)
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
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
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
                        label="Age"
                        variant="outlined"
                        type="number"
                        value={age}
                        onChange={onChangeAge}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Batch"
                        variant="outlined"
                        value={batch}
                        onChange={onChangeBatch}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
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
