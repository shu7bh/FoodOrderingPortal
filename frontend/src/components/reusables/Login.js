import { Grid, TextField, Button  } from "@mui/material";

const Login = props => {
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={props.email}
                    onChange={props.onChangeEmail}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={props.password}
                    onChange={props.onChangePassword}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={props.onSubmit}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    )
}

export default Login
