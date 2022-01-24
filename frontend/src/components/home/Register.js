import { useState } from "react";
import axios from "axios";
import { MenuItem, Select, TextField, Button, FormControl, InputLabel, Grid  } from "@mui/material";
import BuyerRegister from "../buyers/buyerRegister.js";
import VendorRegister from "../vendors/vendorRegister.js";

const Register = (props) => {
    const [userType, setUserType] = useState("");
    const onChangeUserType = (event) => { setUserType(event.target.value); }

    const resetInputs = () => {
        setUserType("");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <div>
                    <h1>Register</h1>
                </div>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel>User Type</InputLabel>
                    <Select
                        value={userType}
                        onChange={onChangeUserType}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    >
                        <MenuItem value=""> None </MenuItem>
                        <MenuItem value={"Buyer"}>Buyer</MenuItem>
                        <MenuItem value={"Vendor"}>Vendor</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
            {
                userType === "Buyer" ? <BuyerRegister /> : userType === "Vendor" ? <VendorRegister /> : null
            }
            </Grid>
        </Grid>
    );
};

export default Register;
