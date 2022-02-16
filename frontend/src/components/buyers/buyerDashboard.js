import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Autocomplete, Button, MenuItem, Rating, Menu, TextField, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoComplete from "../reusables/AutoComplete"

const DialogGrid = ({label, value, xs}) => {
    return (
        <Grid item xs={ xs === undefined ? 6 : xs }>
            <TextField
                label={label}
                variant="outlined"
                value={value}
                disabled={true}
            />
        </Grid>
    )
}

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

    const [showFavourites, setShowFavourites] = useState(false);

    const [anchorMenu, setAnchorMenu] = useState(null);
    const toOpen = Boolean(anchorMenu);
    const [toShow, setToShow] = useState([]);

    const handleMenuClick = (event, list) => { setAnchorMenu(event.currentTarget); setToShow(list)};
    const handleMenuClose = () => { setAnchorMenu(null); setToShow([])};

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
            .get("/api/food/")
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
                    .post("/api/buyer/getWallet", {email: localStorage.getItem("user")})
                    .then((response2) => {
                        setWallet(response2.data.wallet);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // Get shop names based on the time
                axios
                    .get("/api/vendor/getshopnames")
                    .then((response2) => {
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
                threshold: 0.5
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
            .post("/api/favourite/", {email: email})
            .then((response) => {
                if(allFavourites.length)
                    setAllFavourites([]);
                response.data.food.forEach((foodItem) => {
                    axios
                        .post("/api/food/getdetail", {itemName: foodItem.itemName, shopName:foodItem.shopName})
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
            .post("/api/favourite/add", {email: email, itemName: itemName, shopName: shopName})
            .then(() => {
                setFavouriteCounter(favouriteCounter + 1)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeFromFavourites = (itemName, shopName) => {
        axios
            .post("/api/favourite/remove", {email: email, itemName: itemName, shopName: shopName})
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

        let totalPrice = total * _itemQuantity;

        if (totalPrice > wallet)
        {
            alert("Insufficient wallet balance");
            return;
        }

        const order = {
            email: email,
            itemName: _itemName,
            shopName: _itemShopName,
            price: totalPrice,
            addOns: addOnForOrders,
            quantity: Number(_itemQuantity),
            rating: _itemRating
        };

        axios
            .post("/api/buyerorder/add", order)
            .then(() => {
                axios
                    .post("/api/buyer/setWallet", {email: email, wallet: wallet - totalPrice})
                    .then(() => {
                        setWallet(wallet - totalPrice);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} align="right">
                <TextField
                    style={{ align: "right" }}
                    label="Wallet"
                    disabled={true}
                    value={wallet}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => { setShowFavourites(!showFavourites) }}
                >
                    <b>Favourites</b>
                </Button>
            </Grid>
            <Grid item xs={12}>
            </Grid>
        {
            showFavourites ?

            <Grid item xs={12} md={9} lg={20}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Sr No.</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Price </b></TableCell>
                                <TableCell><b>Rating </b></TableCell>
                                <TableCell><b>Tags</b></TableCell>
                                <TableCell><b>Add Ons</b></TableCell>
                                <TableCell><b>Canteen</b></TableCell>
                                <TableCell><b>Veg/Non-Veg</b></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            allFavourites.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.price}</TableCell>
                                    <TableCell>
                                        <Rating
                                            label="Rating"
                                            disabled={true}
                                            min={1}
                                            max={5}
                                            precision={0.5}
                                            value={food.rating}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            style={{ textTransform: 'none' }}
                                            onClick={event => handleMenuClick(event, food.tags)}
                                            variant="outlined"
                                        >
                                            Tags
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={event => handleMenuClick(event, food.addOns)}
                                            color="secondary"
                                            variant="outlined"
                                            style={{ textTransform: 'none' }}
                                        >
                                            Add Ons
                                        </Button>
                                    </TableCell>
                                    <TableCell>{food.shopName}</TableCell>
                                    <TableCell>{food.veg? "Veg" : "NonVeg"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            style={{ minWidth: 150, minHeight : 45, textTransform: 'none' }}
                                            onClick={() => { removeFromFavourites(food.name, food.shopName) }}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="success"
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
            : null
        }
            <Grid item xs align="center">
                <h1>Menu</h1>
            </Grid>
            <Grid item>
                <List component="nav" aria-label="mailbox folders" spacing={0}>
                    <ListItem xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} align="center">
                                <h4>Price</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Min"
                                    type="number"
                                    value={minPrice}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Max"
                                    type="number"
                                    value={maxPrice}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12} align="center">
                                <h4>Tag</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <AutoComplete value={tag} options={allTags} label="Select Tag" set={setTag} minWidth={200}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12} align="center">
                                <h4>Veg/Non-Veg</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <AutoComplete value={vegOrNonVeg} options={["Veg", "Non-Veg"]} label="Select Veg/Non-Veg" set={setVegOrNonVeg} minWidth={200}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12} align="center">
                                <h4>Shop Name</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <AutoComplete value={shopName} options={allShopNames} label="Select Shop Name" set={setShopName} minWidth={200}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ml: 2}}>
                            <Grid item xs={12} align="center">
                                <h4>Clear Filters</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    style={{ minWidth: 350, minHeight : 55 }}
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
                                <TableCell><b>Sr No.</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell>
                                    <b>Price</b>
                                    <Button onClick={() => onSortPrice(!sortPrice)}>
                                        {sortPrice ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <b>Rating</b>
                                    <Button onClick={() => onSortRating(!sortRating)}>
                                        {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell><b>Tags</b></TableCell>
                                <TableCell><b>Add Ons</b></TableCell>
                                <TableCell><b>Canteen</b></TableCell>
                                <TableCell><b>Veg/Non-Veg</b></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            filteredFoodItems.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.price}</TableCell>
                                    <TableCell>
                                        <Rating
                                            label="Rating"
                                            disabled={true}
                                            min={1}
                                            max={5}
                                            precision={0.5}
                                            value={food.rating}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            style={{ textTransform: 'none' }}
                                            disabled={food.tags.length === 0}
                                            onClick={event => handleMenuClick(event, food.tags)}
                                            variant="outlined"
                                        >
                                            Tags
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={event => handleMenuClick(event, food.addOns)}
                                            disabled={food.addOns.length === 0}
                                            color="secondary"
                                            variant="outlined"
                                            style={{ textTransform: 'none' }}
                                        >
                                            Add Ons
                                        </Button>
                                    </TableCell>
                                    <TableCell>{food.shopName}</TableCell>
                                    <TableCell>{food.veg? "Veg" : "NonVeg"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            style={{ minWidth: 150, minHeight : 45, textTransform: 'none' }}
                                            onClick={() => { addToFavourites(food.name, food.shopName) }}>
                                            Add to Favourites
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="success"
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
                            <DialogGrid label="Item Name" value={_itemName} />
                            <DialogGrid label="Item Price" value={_itemPrice} />
                            <DialogGrid label="Shop Name" value={_itemShopName} />
                            <DialogGrid label="Item Type" value={_itemVegOrNonVeg ? 'Veg' : 'Non-Veg'} />
                            <DialogGrid label="Item Rating" items={_itemRating} />
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
                                        <DialogGrid label="AddOns Name" value={addOn.name} xs={4.5}/>
                                        <DialogGrid label="Add On Price" value={addOn.price} xs={4.5}/>
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
                            <DialogGrid label="Total" value={total * _itemQuantity} xs={4}/>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorMenu}
                    open={toOpen}
                    onClose={handleMenuClose}
                >
                {
                    toShow.map((addOn) => (
                        <MenuItem> {addOn.name} </MenuItem>
                    ))
                }
                </Menu>
            </Grid>
        </Grid>
    );
};

export default BuyerDashboard;
