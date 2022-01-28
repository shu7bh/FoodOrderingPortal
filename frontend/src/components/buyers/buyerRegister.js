import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MenuItem, Select, TextField, Button, Grid, FormControl, InputLabel  } from "@mui/material";
import CustomGrid from "../reusables/Register";

const BuyerRegister = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("20");
    const [batch, setBatch] = useState("");

    const onChangeName = (event) => { setName(event.target.value); };
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeAge = (event) => { setAge(event.target.value); }
    const onChangeBatch = (event) => { setBatch(event.target.value); }

    const val = [
        { label: "Name", value: name, onChange: onChangeName },
        { label: "Email", value: email, onChange: onChangeEmail },
        { label: "Password", value: password, onChange: onChangePassword },
        { label: "Contact", value: contact, onChange: onChangeContact },
        { label: "Age", value: age, onChange: onChangeAge, type: "number" }
    ]

    const onSubmit = () => {
        const newUser = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            age: age,
            batch: batch,
        };

        axios
            .post("http://localhost:4000/buyer/register", newUser)
            .then((response) => {
                alert("Created\t" + response.data.name);
                localStorage.setItem("user", newUser.email);
                navigate("/buyer/dashboard");
            })
            .catch((error) => {
                alert(error);
            });

    };

    return (
        <Grid container align={"center"} spacing={2}>
        { val.map(item => <CustomGrid {...item} />) }
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel> Batch </InputLabel>
                    <Select
                        value={batch}
                        onChange={onChangeBatch}
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

export default BuyerRegister;
