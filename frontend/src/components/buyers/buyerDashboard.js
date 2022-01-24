import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Autocomplete, FormControl, MenuItem, Select, InputLabel, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem  } from "@mui/material";

const BuyerDashboard = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [wallet, setWallet] = useState(0);
    const [email] = useState(localStorage.getItem("user"));
    const [allTags, setAllTags] = useState([]);
    const [allShopNames, setAllShopNames] = useState([]);
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState('');
    const [vegOrNonVeg, setVegOrNonVeg] = useState();
    const [shopName, setShopName] = useState("");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:4000/food/")
            .then((response) => {
                setFoodItems(response.data);
                setFilteredFoodItems(response.data);

                // Get all tags
                let tags = [];
                response.data.forEach((foodItem) => {
                    foodItem.tags.forEach((tag) => {
                        if (!tags.includes(tag.name)) {
                            tags.push(tag.name);
                        }
                    });
                });

                // Get all shop names

                let shopNames = [];
                response.data.forEach((foodItem) => {
                    if (!shopNames.includes(foodItem.shopName)) {
                        shopNames.push(foodItem.shopName);
                    }
                });

                setAllShopNames(shopNames);
                setAllTags(tags);
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

    useEffect(() => {
        let result = foodItems;
        if (minPrice === '')
            if (maxPrice === '')
                result = foodItems;
            else
                result = foodItems.filter((foodItem) => foodItem.price <= maxPrice);
        else
            if (maxPrice === '')
                result = foodItems.filter((foodItem) => foodItem.price >= minPrice);
            else
                result = foodItems.filter((foodItem) => foodItem.price >= minPrice && foodItem.price <= maxPrice);

        if (tag !== '' && tag !== null)
        {
            let temp = [];
            result.forEach((foodItem) => {
                foodItem.tags.forEach((tag_) => {
                    if (tag_.name == tag) {
                        temp.push(foodItem);
                    }
                });
            });
            result = temp;
        }

        if (vegOrNonVeg !== '' && vegOrNonVeg !== null)
        {
            const veg = vegOrNonVeg === 'Veg'? true : false;
            let temp = [];
            result.forEach((foodItem) => {
                if (foodItem.veg === veg) {
                    temp.push(foodItem);
                }
            });
            result = temp;
        }

        setFilteredFoodItems(result);
    }, [minPrice, maxPrice, tag, vegOrNonVeg]);

    const onSelectVeg = (value) => {
        if (value == null)
            setFilteredFoodItems(foodItems);
        else {
            const veg = value === "Veg"? true : false;
                const result = []
                foodItems.forEach((foodItem) => {
                    if (foodItem.veg == veg) {
                        result.push(foodItem);
                    }
                });
                setFilteredFoodItems(result);
        }
    };

    const onSelectShop = (value) => {
        if (value == null)
            setFilteredFoodItems(foodItems);
        else {
            const result = []
            foodItems.forEach((foodItem) => {
                if (foodItem.shopName == value) {
                    result.push(foodItem);
                }
            });
            setFilteredFoodItems(result);
        }
    }

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
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
        <Grid container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>
                <TextField
                    style={{ align: "right" }}
                    label="Wallet"
                    variant="outlined"
                    value={wallet}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <h1>Filter</h1>
            </Grid>
            <Grid item>
                <List component="nav" aria-label="mailbox folders" columnSpacing={0}>
                    <ListItem xs={12}>
                        <Grid container md={3} lg={3} columnSpacing={2}>
                            <Grid item xs={12}>
                                Price
                                <p />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Min"
                                    type="number"
                                    style={{ minWidth: 100 }}
                                    fullWidth={true}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Max"
                                    type="number"
                                    style={{ minWidth: 100 }}
                                    fullWidth={true}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} md={3} lg={3} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Tag
                                <p />
                            </Grid>
                            <Grid item xs={2}>
                                <Autocomplete
                                    options={allTags}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => setTag(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Tag"
                                            variant="outlined"
                                        />
                                    )}
                                  />
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} md={3} lg={3} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Veg/Non-Veg
                                <p />
                            </Grid>
                            <Grid item xs={2}>
                                <Autocomplete
                                    options={["Veg", "Non-Veg"]}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => setVegOrNonVeg(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Veg/Non-Veg"
                                            variant="outlined"
                                        />
                                    )}
                                  />
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} md={3} lg={3} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Shop Name
                                <p />
                            </Grid>
                            <Grid item xs={1}>
                                <Autocomplete
                                    align="right"
                                    options={allShopNames}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => onSelectShop(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Shop"
                                            variant="outlined"
                                        />
                                    )}
                                  />
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <TextField
                    label="Search"
                    fullWidth={true}
                    onChange={onChangeSearch}
                />
                <p />
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
                                <TableCell>Canteen</TableCell>
                                <TableCell>Veg/Non-Veg</TableCell>
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
                                    <TableCell>{food.shopName}</TableCell>
                                    <TableCell>{food.veg? "Veg" : "NonVeg"}</TableCell>
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
