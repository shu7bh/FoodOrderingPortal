import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem  } from "@mui/material";

const BuyerDashboard = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [wallet, setWallet] = useState(0);
    const [email] = useState(localStorage.getItem("user"));

    useEffect(() => {
        axios
            .get("http://localhost:4000/food/")
            .then((response) => {
                setFoodItems(response.data);
                setFilteredFoodItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .post("http://localhost:4000/buyer/getWallet", {email: email})
            .then((response) => {
                setWallet(response.data.wallet);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const onChangeSearch = (event) => {
        const fuse = new Fuse(foodItems, {
            keys: ["name"],
            threshold: 0.2
        });

        const result = fuse.search(event.target.value);
        const finalResults = []
        if (result.length > 0) {
            result.forEach((food) => {
                finalResults.push(food.item);
            });
            setFilteredFoodItems(finalResults);
        } else {
            setFilteredFoodItems(foodItems);
        }
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={0}>
                <TextField
                    style={{ align: "right" }}
                    label="Wallet"
                    variant="outlined"
                    value={wallet}
                />
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <TextField
                    label="Search"
                    fullWidth={true}
                    onChange={onChangeSearch}
                />
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Add Ons</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            filteredFoodItems.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind}</TableCell>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.description}</TableCell>
                                    <TableCell>{food.price}</TableCell>
                                    <TableCell>{food.rating}</TableCell>
                                    <TableCell>
                                        <List>
                                            {
                                                food.tags.map((tag) => (
                                                <ListItem> {tag.name} </ListItem>
                                            ))}
                                        </List>
                                    </TableCell>
                                    <TableCell>
                                        <List>
                                            {
                                                food.addOns.map((addOn) => (
                                                <ListItem> {addOn.name} </ListItem>
                                            ))}
                                        </List>
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

export default BuyerDashboard;
