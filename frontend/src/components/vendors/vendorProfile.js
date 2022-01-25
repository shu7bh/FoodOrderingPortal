import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MenuItem, Select, TextField, Button, Grid, FormControl, InputLabel  } from "@mui/material";

const VendorProfile = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("user"));
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");

    const [editOn, setEditOn] = useState(false);

    const [savedName, setSavedName] = useState("");
    const [savedShopName, setSavedShopName] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    const [savedContact, setSavedContact] = useState("");
    const [savedOpeningTime, setSavedOpeningTime] = useState("");
    const [savedClosingTime, setSavedClosingTime] = useState("");

    const onChangeName = (event) => { setName(event.target.value); }
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeShopName = (event) => { setShopName(event.target.value); }
    const onChangeOpeningTime = (event) => { setOpeningTime(event.target.value); }
    const onChangeClosingTime = (event) => { setClosingTime(event.target.value); }
    const onEditToggle = (event) => { setEditOn(!editOn); }

    useEffect(() => {
        axios .post("http://localhost:4000/vendor/getDetails", {email: email})
            .then((response) => {
                setName(response.data.name);
                setPassword(response.data.password);
                setContact(response.data.contact);
                setShopName(response.data.shopName);
                setOpeningTime(response.data.openingTime);
                setClosingTime(response.data.closingTime);
                setSavedName(response.data.name);
                setSavedPassword(response.data.password);
                setSavedShopName(response.data.shopName);
                setSavedContact(response.data.contact);
                setSavedOpeningTime(response.data.openingTime);
                setSavedClosingTime(response.data.closingTime);
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    }, []);

    const resetInputs = () => {
        setName(savedName);
        setPassword(savedPassword);
        setContact(savedContact);
        setShopName(savedShopName);
        setOpeningTime(savedOpeningTime);
        setClosingTime(savedClosingTime);
        setEditOn(false);
    };

    const onCancel = (event) => {
        resetInputs();
        setEditOn(false);
    };

    const onSave = (event) => {
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
            .post("http://localhost:4000/vendor/update", user)
            .then((response) => {
                setSavedName(name);
                setSavedPassword(password);
                setSavedContact(contact);
                setSavedShopName(shopName);
                setSavedOpeningTime(openingTime);
                setSavedClosingTime(closingTime);
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
                        label="Shop Name"
                        variant="outlined"
                        value={shopName}
                        onChange={onChangeShopName}
                        disabled={!editOn}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
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
                    <Grid container align={"center"} spacing={2}>
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

export default VendorProfile;
