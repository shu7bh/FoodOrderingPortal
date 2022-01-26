import { useState, useEffect } from "react";
import { Autocomplete, Button, MenuItem, Chip, Select, InputLabel, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText  } from "@mui/material";
import axios from "axios";

const VendorMyOrders = () => {
    const [email] = useState(localStorage.getItem("user"))
    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState("");
    const [_status, _setStatus] = useState("");
    //const [rate, setRate] = useState(3);

    useEffect(() => {
        axios
            .post("http://localhost:4000/vendor/getshopname", {email: localStorage.getItem('user')})
            .then((response) => {
                setShopName(response.data);

                axios
                    .post("http://localhost:4000/buyerorder/getallorders", {shopName: response.data})
                    .then((response) => {
                        setOrders(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleStatus = (buyerEmail, itemName, shopName) => {
        axios
            .post("http://localhost:4000/buyerorder/updatestatus", {email: buyerEmail, itemName: itemName, shopName: shopName})
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleRejected = (buyerEmail, itemName, shopName) => {
        axios
            .post("http://localhost:4000/buyerorder/updaterejected", {email: buyerEmail, itemName: itemName, shopName: shopName})
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12} align="center">
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
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Add Ons</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            orders.map((order, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>
                                        {(new Date(order.createdAt)).getHours()}
                                        :
                                        {(new Date(order.createdAt)).getMinutes()}
                                    </TableCell>
                                    <TableCell>{order.food.itemName}</TableCell>
                                    <TableCell>{order.food.quantity}</TableCell>
                                    <TableCell>{order.myStatus}</TableCell>
                                    <TableCell>{order.food.price}</TableCell>
                                    <TableCell>{order.food.addOns.map((addOn, ind) => (
                                        <Chip key={ind} label={addOn} />
                                    ))}</TableCell>
                                    <TableCell>
                                    {
                                        order.myStatus === "Rejected" ?
                                            <Button
                                                variant="contained"
                                                style={{ minWidth: 200, minHeight : 45 }}
                                                color="error">
                                                Rejected
                                            </Button>
                                        :
                                        <Grid container spacing={2}>
                                            <Grid item xs={order.myStatus === "Placed" ? 6 : 12}>
                                                <Button
                                                    variant="contained"
                                                    style={{ minWidth: 200, minHeight : 45 }}
                                                    disabled={order.myStatus === "Completed"}
                                                    color={order.myStatus === "Placed"? "success" : "primary"}
                                                    onClick={() => { handleStatus(order.email, order.food.itemName, order.food.shopName) }}>
                                                    {order.myStatus === "Completed"? "Completed" : order.myStatus === "Placed" ? "Accept" : order.myStatus === "Ready For Pickup" ? "Mark as Completed" : "Move to Next Stage"}
                                                </Button>
                                            </Grid>
                                            {
                                                order.myStatus === "Placed" ?
                                                        <Grid item xs={6}>
                                                            <Button
                                                                variant="contained"
                                                                style={{ minWidth: 150, minHeight : 45 }}
                                                                color="error"
                                                                onClick={() => { handleRejected(order.email, order.food.itemName, order.food.shopName) }}>
                                                                Reject
                                                            </Button>
                                                        </Grid>
                                                : null
                                            }
                                        </Grid>

                                    }
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

export default VendorMyOrders;
