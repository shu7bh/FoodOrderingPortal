import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Autocomplete, Button, MenuItem, Select, InputLabel, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText  } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const BuyerDashboard = () => {

    const email = localStorage.getItem("user");
    const [foodItems, setFoodItems] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [wallet, setWallet] = useState(0);
    const [allTags, setAllTags] = useState([]);
    const [allShopNames, setAllShopNames] = useState([]);
    const [allFavourites, setAllFavourites] = useState([]);
    const [favouriteCounter, setFavouriteCounter] = useState(0);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('');
    const [vegOrNonVeg, setVegOrNonVeg] = useState();
    const [shopName, setShopName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortPrice, setSortPrice] = useState(false);
    const [sortRating, setSortRating] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

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

                axios
                    .post("http://localhost:4000/buyer/getWallet", {email: localStorage.getItem("user")})
                    .then((response2) => {
                        setWallet(response2.data.wallet);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })

            .catch((error) => {
                console.log(error);
            });


    }, []);

    useEffect(() => {
        let result = []
        foodItems.forEach((foodItem) => { result.push(foodItem); } );

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

        if (vegOrNonVeg !== '' && vegOrNonVeg !== null && vegOrNonVeg !== undefined)
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

        if (shopName !== '' && shopName !== null)
        {
            let temp = [];
            result.forEach((foodItem) => {
                if (foodItem.shopName === shopName) {
                    temp.push(foodItem);
                }
            });
            result = temp;
        }

        if (search !== '')
        {
            const fuse = new Fuse(result, {
                keys: ["name"],
                threshold: 0.3
            });

            const res = fuse.search(search);
            const temp = [];
            if (res.length > 0)
            {
                res.forEach((foodItem) => {
                    temp.push(foodItem.item);
                });
                result = temp;
            }
            else
                result = []
        }

        setFilteredFoodItems(result);
    }, [minPrice, maxPrice, tag, vegOrNonVeg, shopName, search]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/favourite/", {email: email})
            .then((response) => {
                if(allFavourites.length)
                    setAllFavourites([]);
                response.data.food.forEach((foodItem) => {
                    axios
                        .post("http://localhost:4000/food/getdetail", {itemName: foodItem.itemName, shopName:foodItem.shopName})
                        .then((response) => {
                            if (!allFavourites.includes(response.data))
                                setAllFavourites(prev => [...prev, response.data]);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [favouriteCounter, email])

    const onSortPrice = (val) => {
        setSortPrice(val);

        if (val)
            setFilteredFoodItems(filteredFoodItems.sort((a, b) => b.price - a.price));
        else
            setFilteredFoodItems(filteredFoodItems.sort((a, b) => a.price - b.price));
    }

    const onSortRating = (val) => {
        setSortRating(val);

        if (val)
            setFilteredFoodItems(filteredFoodItems.sort((a, b) => a.rating - b.rating));
        else
            setFilteredFoodItems(filteredFoodItems.sort((a, b) => b.rating - a.rating));
    }

    const onChangeSearch = (event) => { setSearch(event.target.value) };

    const addToFavourites = (itemName, shopName) => {
        axios
            .post("http://localhost:4000/favourite/add", {email: email, itemName: itemName, shopName: shopName})
            .then(() => {
                setFavouriteCounter(favouriteCounter + 1)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeFromFavourites = (itemName, shopName) => {
        axios
            .post("http://localhost:4000/favourite/remove", {email: email, itemName: itemName, shopName: shopName})
            .then(() => {
                setFavouriteCounter(favouriteCounter - 1)
            })
    }

    return (
        <Grid container item xs={12}>
            <Grid>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} >
                    <DialogTitle>
                        Buy
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to buy this item
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => { setDialogOpen(false) }} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <TextField
                    style={{ align: "right" }}
                    label="Wallet"
                    variant="outlined"
                    value={wallet}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <h1>Favourites</h1>
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>
                                    Price
                                    <Button onClick={() => onSortPrice(!sortPrice)}>
                                        {sortPrice ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    Rating
                                    <Button onClick={() => onSortRating(!sortRating)}>
                                        {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Add Ons</TableCell>
                                <TableCell>Canteen</TableCell>
                                <TableCell>Veg/Non-Veg</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            allFavourites.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
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
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            onClick={() => { removeFromFavourites(food.name, food.shopName) }}>
                                            Remove to Favourites
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            onClick={() => { setDialogOpen(true) }}>
                                            Buy
                                        </Button>
                                    </TableCell>
                              </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <h1>Filter</h1>
            </Grid>
            <Grid item>
                <List component="nav" aria-label="mailbox folders" spacing={0}>
                    <ListItem xs={12}>
                        <Grid container spacing={2}>
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
                                    value={minPrice}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Max"
                                    type="number"
                                    style={{ minWidth: 100 }}
                                    fullWidth={true}
                                    value={maxPrice}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Tag
                                <p />
                            </Grid>
                            <Grid item xs={2}>
                                <Autocomplete
                                    options={allTags}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => setTag(value)}
                                    value={tag}
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
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Veg/Non-Veg
                                <p />
                            </Grid>
                            <Grid item xs={2}>
                                <Autocomplete
                                    options={["Veg", "Non-Veg"]}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => setVegOrNonVeg(value)}
                                    value={vegOrNonVeg}
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
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Shop Name
                                <p />
                            </Grid>
                            <Grid item xs={1}>
                                <Autocomplete
                                    align="right"
                                    options={allShopNames}
                                    style={{ minWidth: 200 }}
                                    onChange={(_, value) => setShopName(value)}
                                    value={shopName}
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
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12}>
                                Clear Filters
                                <p />
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ minWidth: 200, minHeight : 55 }}
                                    onClick={() => {
                                        setMinPrice('');
                                        setMaxPrice('');
                                        setTag('');
                                        setVegOrNonVeg('');
                                        setShopName('');
                                        setSearch('');
                                        setFilteredFoodItems(foodItems);
                                    }}
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} md={9} lg={20}>
                <TextField
                    label="Search"
                    fullWidth={true}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                                <TableCell>
                                    Price
                                    <Button onClick={() => onSortPrice(!sortPrice)}>
                                        {sortPrice ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    Rating
                                    <Button onClick={() => onSortRating(!sortRating)}>
                                        {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Add Ons</TableCell>
                                <TableCell>Canteen</TableCell>
                                <TableCell>Veg/Non-Veg</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            filteredFoodItems.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
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
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            onClick={() => { addToFavourites(food.name, food.shopName) }}>
                                            Add to Favourites
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            onClick={() => { setDialogOpen(true) }}>
                                            Buy
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

export default BuyerDashboard;
