import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Autocomplete, Button, MenuItem, Chip, Select, InputLabel, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText  } from "@mui/material";
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

    const [_itemName, _setItemName] = useState('');
    const [_itemPrice, _setItemPrice] = useState('');
    const [_itemDescription, _setItemDescription] = useState('');
    const [_itemImage, _setItemImage] = useState('');
    const [_itemTags, _setItemTags] = useState([]);
    const [_itemShopName, _setItemShopName] = useState('');
    const [_itemVegOrNonVeg, _setItemVegOrNonVeg] = useState('');
    const [_itemType, _setItemType] = useState('');
    const [_itemAddOns, _setItemAddOns] = useState([]);
    const [_itemRating, _setItemRating] = useState('');
    const [_itemQuantity, _setItemQuantity] = useState(1);

    const [total, setTotal] = useState(0);
    const [addOnForOrders, setAddOnForOrders] = useState([]);

    const [closedCanteens, setClosedCanteens] = useState([]);

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

                // Get shop names based on the time
                axios
                    .get("http://localhost:4000/vendor/getshopnames")
                    .then((response2) => {
                        console.log(response2.data);
                        setClosedCanteens(response2.data);
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

        let arr1 = [];
        let arr2 = [];
        result.forEach((foodItem) => {
            if (closedCanteens.includes(foodItem.shopName))
                arr1.push(foodItem);
            else
                arr2.push(foodItem);
        })

        result = [...arr2, ...arr1]
        setFilteredFoodItems(result);
    }, [minPrice, maxPrice, tag, vegOrNonVeg, shopName, search, closedCanteens]);

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

        let result = [];
        if (val)
            result = filteredFoodItems.sort((a, b) => b.price - a.price);
        else
            result = filteredFoodItems.sort((a, b) => a.price - b.price);

        let arr1 = [];
        let arr2 = [];
        result.forEach((foodItem) => {
            if (closedCanteens.includes(foodItem.shopName))
                arr1.push(foodItem);
            else
                arr2.push(foodItem);
        })

        result = [...arr2, ...arr1]
        setFilteredFoodItems(result)
    }

    const onSortRating = (val) => {
        setSortRating(val);

        let result = [];
        if (val)
            result = filteredFoodItems.sort((a, b) => a.rating - b.rating);
        else
            result = filteredFoodItems.sort((a, b) => b.rating - a.rating);

        let arr1 = [];
        let arr2 = [];
        result.forEach((foodItem) => {
            if (closedCanteens.includes(foodItem.shopName))
                arr1.push(foodItem);
            else
                arr2.push(foodItem);
        })

        result = [...arr2, ...arr1]
        setFilteredFoodItems(result)
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

    const setFoodItem = (food) => {
        _setItemName(food.name);
        _setItemShopName(food.shopName);
        _setItemPrice(food.price);
        _setItemRating(food.rating);
        _setItemVegOrNonVeg(food.veg)
        _setItemTags(food.tags);
        _setItemAddOns(food.addOns)
        setTotal(food.price);
    }

    const placeOrder = () => {
        if (total * _itemQuantity > wallet)
        {
            alert("Insufficient wallet balance");
            return;
        }

        const order = {
            email: email,
            itemName: _itemName,
            shopName: _itemShopName,
            price: total,
            addOns: addOnForOrders,
            quantity: Number(_itemQuantity),
            rating: _itemRating
        };

        axios
            .post("http://localhost:4000/buyerorder/add", order)
            .then(() => {
                setWallet(wallet - (total * _itemQuantity));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Grid container item xs={12}>
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
                                            Remove from Favourites
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ minWidth: 100, minHeight : 45 }}
                                            disabled={closedCanteens.includes(food.shopName)}
                                            onClick={() => {
                                                setDialogOpen(true);
                                                setFoodItem(food);
                                            }}>
                                            { (closedCanteens.includes(food.shopName)) ? "Closed" : "Buy" }
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
                                            disabled={closedCanteens.includes(food.shopName)}
                                            onClick={() => {
                                                setDialogOpen(true);
                                                setFoodItem(food);
                                            }}>
                                            { (closedCanteens.includes(food.shopName)) ? "Closed" : "Buy" }
                                        </Button>
                                    </TableCell>
                              </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid>
        <Dialog open={dialogOpen} onClose={() => {
            setDialogOpen(false)
            setAddOnForOrders([])
            _setItemQuantity(1)
        }} >
                    <DialogTitle>
                        Buy
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Name"
                                    variant="outlined"
                                    value={_itemName}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Price"
                                    variant="outlined"
                                    value={_itemPrice}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Shop Name"
                                    variant="outlined"
                                    value={_itemShopName}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Type"
                                    variant="outlined"
                                    value={_itemVegOrNonVeg ? 'Veg' : 'Non-Veg'}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Rating"
                                    variant="outlined"
                                    value={_itemRating}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    value={_itemQuantity}
                                    onChange={(event) => {
                                        let q = event.target.value;
                                        if (q > 0)
                                            _setItemQuantity(q);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                            </Grid>
                            <Grid item xs={9}>
                            </Grid>
                            <Grid item xs={12}>
                            {
                                _itemAddOns.map((addOn) => (
                                    <Grid container spacing={3}>
                                        <Grid item xs={4.5}>
                                            <TextField
                                                label="Add On Name"
                                                variant="outlined"
                                                value={addOn.name}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4.5}>
                                            <TextField
                                                label="Add On Price"
                                                variant="outlined"
                                                value={addOn.price}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <Button
                                                variant="contained"
                                                color={addOnForOrders.includes(addOn.name) ? "secondary" : "primary"}
                                                style={{ minWidth: 100, minHeight : 55 }}
                                                onClick={() => {
                                                    if (addOnForOrders.includes(addOn.name))
                                                    {
                                                        setAddOnForOrders(prev => prev.filter(item => item !== addOn.name))
                                                        setTotal(total - addOn.price);
                                                    }
                                                    else
                                                    {
                                                        setAddOnForOrders(prev => [...prev, addOn.name])
                                                        setTotal(total + addOn.price);
                                                    }
                                                }}>
                                                {addOnForOrders.includes(addOn.name)? "Remove" : "Add"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={{ minWidth: 200, minHeight : 55 }}
                                    onClick={() => { setDialogOpen(false) }}>
                                    Cancel Order
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color={total * _itemQuantity > wallet ? "error" : "success"}
                                    style={{ minWidth: 200, minHeight : 55 }}
                                    onClick={() => { setDialogOpen(false); placeOrder() }}>
                                    Confirm Order
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Total"
                                    variant="outlined"
                                    value={total * _itemQuantity}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default BuyerDashboard;
