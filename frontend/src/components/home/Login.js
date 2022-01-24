import { useState } from "react";
import axios from "axios";
import { MenuItem, Select, TextField, Button, Grid, FormControl, InputLabel  } from "@mui/material";
import BuyerLogin from "../buyers/buyerLogin.js";
import VendorLogin from "../vendors/vendorLogin.js";

const Login = (props) => {
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
                    <h1>Login</h1>
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
                        <MenuItem value={""}> <em>None</em> </MenuItem>
                        <MenuItem value={"Buyer"}>Buyer</MenuItem>
                        <MenuItem value={"Vendor"}>Vendor</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
            {
                userType === "Buyer" ? <BuyerLogin /> : userType === "Vendor" ? <VendorLogin /> : null
            }
            </Grid>
        </Grid>
    );
};

export default Login;
