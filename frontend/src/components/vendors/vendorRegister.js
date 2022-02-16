import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel  } from "@mui/material";
import CustomGrid from "../reusables/Register";

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

    const val = [
        { label: "Name", value: name, onChange: onChangeName },
        { label: "Email", value: email, onChange: onChangeEmail },
        { label: "Password", value: password, onChange: onChangePassword, type: "password" },
        { label: "Contact", value: contact, onChange: onChangeContact },
        { label: "Shop Name", value: shopName, onChange: onChangeShopName },
        { label: "Opening Time", value: openingTime, onChange: onChangeOpeningTime, type: "time" },
        { label: "Closing Time", value: closingTime, onChange: onChangeClosingTime, type: "time" },
    ]


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
            .post("/api/vendor/register", newUser)
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
        { val.map(item => <CustomGrid {...item} />) }
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
