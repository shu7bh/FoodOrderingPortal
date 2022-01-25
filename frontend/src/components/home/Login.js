import { useState } from "react";
import { TextField, Grid, Autocomplete } from "@mui/material";
import BuyerLogin from "../buyers/buyerLogin.js";
import VendorLogin from "../vendors/vendorLogin.js";

const Login = () => {
    const [userType, setUserType] = useState("");

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <div>
                    <h1>Login</h1>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    options={["Buyer", "Vendor"]}
                    style={{ maxWidth: 400 }}
                    onChange={(_, value) => setUserType(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="User Type"
                            variant="outlined"
                        />
                    )}/>
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
