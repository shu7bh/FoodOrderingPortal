import { useState, useEffect } from "react";
import { Autocomplete, Button, MenuItem, Chip, Select, InputLabel, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText  } from "@mui/material";
import axios from "axios";

const BuyerMyOrders = () => {
    const [email] = useState(localStorage.getItem('user'));
    const [orders, setOrders] = useState([]);
    const [rate, setRate] = useState(3);

    useEffect(() => {
        axios
            .post("http://localhost:4000/buyerorder/getorders", {email: localStorage.getItem('user')})
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRate = (itemName, shopName) => {
        const orderRate = {
            itemName: itemName,
            shopName: shopName,
            rate: rate
        };

        axios
            .post("http://localhost:4000/food/setRate", orderRate)
            .then(() => {
            })
            .catch(() => {
            });
    }

    const onChangeRate = (event) => {
        if (event.target.value <= 5 && event.target.value >= 1)
            setRate(event.target.value);
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={12} lg={12}>
                <h1>My Orders</h1>
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell>Order Time</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Canteen</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            orders.map((order, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>
                                        {(new Date(order.createdAt)).toTimeString().split(' ')[0]}
                                    </TableCell>
                                    <TableCell>{order.food.itemName}</TableCell>
                                    <TableCell>{order.food.shopName}</TableCell>
                                    <TableCell>{order.food.quantity}</TableCell>
                                    <TableCell>{order.myStatus}</TableCell>
                                    <TableCell>{order.food.price}</TableCell>
                                    <TableCell>
                                        <TextField
                                            style={{ maxWidth: 100 }}
                                            label="Rate"
                                            type="number"
                                            disabled={order.myStatus !== "Completed"}
                                            variant="standard"
                                            min={1}
                                            max={5}
                                            value={rate}
                                            onChange={onChangeRate}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            onClick={() => { handleRate(order.food.itemName, order.food.shopName) }}>
                                            Rate
                                        </Button>
                                    </TableCell>
                              </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default BuyerMyOrders;
