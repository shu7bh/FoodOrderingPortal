import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Paper, Menu, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import { Switch, FormControlLabel } from "@mui/material";
import TableHeader from "../tableHeader.js";

const VendorDashboard = () => {

    const [name, setName] = useState("");
    const [savedName, setSavedName] = useState("");
    const [price, setPrice] = useState(0);
    const [veg, setVeg] = useState(true);
    const [shopName, setShopName] = useState("");
    const [tags, setTags] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [orders, setOrders] = useState([]);

    const [newTag, setNewTag] = useState("");
    const [newAddOnName, setNewAddOnName] = useState("");
    const [newAddOnPrice, setNewAddOnPrice] = useState(0);

    const [isEditOn, setIsEditOn] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [anchorMenu, setAnchorMenu] = useState(null);
    const toOpen = Boolean(anchorMenu);
    const [toShow, setToShow] = useState([]);

    const handleMenuClick = (event, list) => { setAnchorMenu(event.currentTarget); setToShow(list)};
    const handleMenuClose = () => { setAnchorMenu(null); setToShow([])};

    const resetInputs = () => {
        setName("");
        setPrice(0);
        setVeg(true);
        setTags([]);
        setAddOns([]);
    };

    const deleteFood = (itemName) => {
        axios.post("/api/food/remove", {shopName: shopName, itemName: itemName})
            .then(() => {
                setOrders(orders.filter(order => order.name !== itemName && order.shopName !== shopName));
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const editFood = (food) => {
        setName(food.name);
        setSavedName(food.name);
        setPrice(food.price);
        setVeg(food.veg);
        setTags(food.tags);
        setAddOns(food.addOns);
        setIsEditOn(true)
    };

    const updateFood = () => {

        const food = {
            itemName: savedName,
            name: name,
            price: price,
            veg: veg,
            tags: tags,
            addOns: addOns,
            shopName: shopName
        };

        axios.post("/api/food/update", food)
            .then(() => {
                let newOrders = orders.filter(order => order.name !== savedName && order.shopName !== shopName);
                newOrders = [...newOrders, {name: name, price: price, veg: veg, tags: tags, addOns: addOns, shopName: shopName}];
                setOrders(newOrders);
                resetInputs();
                setIsEditOn(false);
            })
            .catch(err => console.log(err));
    };


    const addFood = () => {
        const food = {
            shopName: shopName,
            name: name,
            price: price,
            veg: veg,
            tags: tags,
            rating: 0,
            addOns: addOns
        };

        axios.post("/api/food/add", food)
            .then(() => {
                setOrders(orders.concat(food));
            })
            .catch(err => console.log(err));

        resetInputs()
    }

    useEffect(() => {
        axios
            .post("/api/vendor/getshopname", {email: localStorage.getItem('user')})
            .then((response) => {
                setShopName(response.data);

                axios
                    .post("/api/food/getallfood", {shopName: response.data})
                    .then((res) => {
                        setOrders(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} align="center">
                <h1>Favourites</h1>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="outlined"
                    style={{minWidth: 150}}
                    onClick={() => setDialogOpen(true)}
                    color="primary">
                    Add Food
                </Button>
            </Grid>
            <Grid item xs={12}>  </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Table size="small">
                        <TableHeader/>
                        <TableBody>{
                            orders.map((food, ind) =>(
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.price}</TableCell>
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
                                    <TableCell>{food.veg? "Veg" : "NonVeg"}</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => deleteFood(food.name)}
                                                    color="error">
                                                    Delete
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => {
                                                        setDialogOpen(true);
                                                        editFood(food)
                                                    }}>
                                                    Edit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                              </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {setDialogOpen(false); resetInputs();}}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} align="center">
                                <h2>{isEditOn ? "Edit " + savedName : "Add Food"}</h2>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Item Price"
                                    variant="outlined"
                                    value={price}
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4.75}>
                            </Grid>
                            <Grid item xs={7.25}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={veg}
                                            onChange={() => setVeg(!veg)}
                                        />
                                    }
                                    label={veg ? "Veg" : "Non-Veg"}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <h3>Tags</h3>
                            </Grid>
                            <Grid item xs={12}>
                            {
                                tags.map(tag => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                value={tag.name}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                style={{minWidth: 250, minHeight: 55}}
                                                onClick={() => {
                                                    setTags(tags.filter(t => t !== tag));
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    label="Name"
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{minWidth: 250, minHeight: 55}}
                                    onClick={() => {
                                        if(newTag !== "") {
                                            if (!tags.some(tag => tag.name.toLowerCase() === newTag.toLowerCase()))
                                                setTags([...tags, {name: newTag}]);
                                            setNewTag("");
                                        }
                                    }}
                                >
                                    Add Tag
                                </Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <h3>Addons</h3>
                            </Grid>
                            <Grid item xs={12}>
                            {
                                addOns.map(addOn => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                variant="outlined"
                                                value={addOn.name}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                variant="outlined"
                                                value={addOn.price}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                style={{minWidth: 155, minHeight: 55}}
                                                onClick={() => {
                                                    setAddOns(addOns.filter(t => t !== addOn));
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    label="Name"
                                    value={newAddOnName}
                                    onChange={e => setNewAddOnName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    label="Price"
                                    type="number"
                                    value={newAddOnPrice}
                                    onChange={e => {
                                        if (e.target.value >= 0)
                                            setNewAddOnPrice(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{minWidth: 155, minHeight: 55}}
                                    onClick={() => {
                                        if(newAddOnName !== "" && newAddOnPrice != 0 && !isNaN(newAddOnPrice)) {
                                            if (!addOns.some(addon => addon.name.toLowerCase() === newAddOnName.toLowerCase()))
                                                setAddOns([...addOns, {name: newAddOnName, price: newAddOnPrice}]);

                                            setNewAddOnName("");
                                            setNewAddOnPrice(0);
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={3}>
                            <Grid item xs={1.5}>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    style={{ minWidth: 200, minHeight : 55 }}
                                    onClick={() => { setDialogOpen(false); resetInputs() }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    style={{ minWidth: 200, minHeight : 55 }}
                                    onClick={() => {
                                        if(name !== "" && price != 0 && !isNaN(price)) {
                                            setDialogOpen(false);
                                            resetInputs();
                                            if (isEditOn)
                                                updateFood();
                                            else
                                                addFood()
                                        }
                                    }}
                                >
                                    {isEditOn ? "Save" : "Add Item"}
                                </Button>
                            </Grid>
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

export default VendorDashboard;
