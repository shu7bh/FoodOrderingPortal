import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const BuyerDashboard = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("user"));
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    const onChangeName = (event) => { setName(event.target.value); }
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeAge = (event) => { setAge(event.target.value); }
    const onChangeBatch = (event) => { setBatch(event.target.value); }

    axios
        .post("http://localhost:4000/buyer/getDetails", email)
        .then((response) => {
            name = response.data.name;
            contact = response.data.contact;
            age = response.data.age;
            batch = response.data.batch;
        })
        .catch((error) => {
            alert("Error\t" + error);
        });

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setAge("");
        setBatch("");
    };

    const onSubmit = (event) => {
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
            .post("http://localhost:4000/buyer/login", user)
            .then((response) => {
                alert("Login Successful");
                resetInputs();
                navigate("/buyer/profile");
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
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default BuyerDashboard;
