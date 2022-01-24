import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField, Button  } from "@mui/material";

const BuyerWallet = () => {
    const [email] = useState(localStorage.getItem('user'));
    const [newWallet, setNewWallet] = useState('');
    const [wallet, setWallet] = useState(0);

    const onChangeNewWallet = (event) => { setNewWallet(event.target.value); }

    useEffect(() => {
        axios.post("http://localhost:4000/buyer/getWallet", {email: email})
        .then((response) => {
            setWallet(response.data.wallet);
        })
        .catch((error) => {
            alert("Error\t" + error);
        });
    }, []);

    const onAdd = (event) => {
        event.preventDefault();

        const user = {
            email: email,
            wallet: Number(wallet) + Number(newWallet)
        };

        axios
            .post("http://localhost:4000/buyer/setWallet", user)
            .then(() => {
                alert("Wallet Updated");
                setWallet(user.wallet);
                setNewWallet('');
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    };

    return (
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Wallet"
                        variant="outlined"
                        value={wallet}
                        type="number"
                        disabled={true}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Add Money"
                        variant="outlined"
                        value={newWallet}
                        type="number"
                        onChange={onChangeNewWallet}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={onAdd}
                        sx = {{ minWidth: "400px", minHeight: "60px" }}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
    );
};

export default BuyerWallet;
