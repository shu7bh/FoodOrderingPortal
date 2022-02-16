import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MenuItem, Select, TextField, Button, Grid, FormControl, InputLabel  } from "@mui/material";
import CustomGrid from "../reusables/Register";
import AutoComplete from "../reusables/AutoComplete"

const BuyerRegister = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("20");
    const [batch, setBatch] = useState("");
    const [allBatches, setAllBatches] = useState([]);

    useEffect(() => {
        setAllBatches(["UG1", "UG2", "UG3", "UG4", "UG5", "UG6", "UG7", "UG8", "PG1", "PG2"])
    }, [])

    const onChangeName = (event) => { setName(event.target.value); };
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeContact = (event) => { setContact(event.target.value); }
    const onChangeAge = (event) => { setAge(event.target.value); }

    const val = [
        { label: "Name", value: name, onChange: onChangeName },
        { label: "Email", value: email, onChange: onChangeEmail, type: "email" },
        { label: "Password", value: password, onChange: onChangePassword, type: "password" },
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
            .post("/api/buyer/register", newUser)
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
                <AutoComplete label={"Batch"} value={batch} set={setBatch} options={allBatches} minWidth={400} maxWidth={400}/>
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
