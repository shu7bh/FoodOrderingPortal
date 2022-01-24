import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Home = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    return (
        <Grid container align={"center"} spacing={5}>
            <Grid item xs={12}>
                <div style={{ font : "bold", fontSize : "2em" }}>
                    Welcome to IIIT Hyderabad Food Ordering Portal
                </div>
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{maxWidth: '12rem', maxHeight: '4rem', minWidth: '12rem', minHeight: '4rem', fontSize: '1.2rem'}}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{maxWidth: '12rem', maxHeight: '4rem', minWidth: '12rem', minHeight: '4rem', fontSize: '1.2rem'}}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </Grid>
        </Grid>
    )
};

export default Home;
