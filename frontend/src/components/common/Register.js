import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";
import BuyerRegister from "../users/buyerRegister.js";
import VendorRegister from "../vendors/vendorRegister.js";

const Register = (props) => {
    const [userType, setUserType] = useState("Buyer");
    const onChangeUserType = (event) => { setUserType(event.target.value); }

    const resetInputs = () => {
        setUserType("Select");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            userType: userType
        };

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <Select value={userType} onChange={onChangeUserType}>
                    <MenuItem value={"Buyer"}>Buyer</MenuItem>
                    <MenuItem value={"Vendor"}>Vendor</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
            {
                userType === "Buyer" ? <BuyerRegister /> : <VendorRegister />
            }
            </Grid>
        </Grid>
    );
};

export default Register;
