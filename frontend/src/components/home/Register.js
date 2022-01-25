import { useState } from "react";
import { TextField, Grid, Autocomplete  } from "@mui/material";
import BuyerRegister from "../buyers/buyerRegister.js";
import VendorRegister from "../vendors/vendorRegister.js";

const Register = (props) => {
    const [userType, setUserType] = useState("");

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <div>
                    <h1>Register</h1>
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
                userType === "Buyer" ? <BuyerRegister /> : userType === "Vendor" ? <VendorRegister /> : null
            }
            </Grid>
        </Grid>
    );
};

export default Register;
