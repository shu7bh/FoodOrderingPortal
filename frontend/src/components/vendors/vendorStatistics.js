import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

const VendorProfile = (props) => {
    const [email, setEmail] = useState(localStorage.getItem("user"));
    const [topFoods, setTopFoods] = useState([]);
    const [ordersPlaced, setOrdersPlaced] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);

    useEffect(() => {
        axios.post("http://localhost:4000/vendor/getshopname", {email: localStorage.getItem("user")})
            .then((response) => {
                axios
                    .post("http://localhost:4000/buyerorder/getallorders", {shopName: response.data})
                    .then((response) => {
                        let topFood = [];
                        let pendingOrders = 0;
                        let completedOrders = 0;

                        setOrdersPlaced(response.data.length)
                        response.data.map(foodItem => {
                            if (foodItem.myStatus === "Completed")
                            {
                                completedOrders++;
                                if (!topFood.some(food => food.name === foodItem.food.itemName))
                                    topFood.push({name: foodItem.food.itemName, count: 1});
                                else
                                    topFood.map(food => {
                                        if (food.name === foodItem.food.itemName)
                                            food.count++;
                                    });
                            }
                            else if (foodItem.myStatus !== "Rejected")
                            {
                                pendingOrders++;
                            }
                        })

                        setPendingOrders(pendingOrders);
                        setCompletedOrders(completedOrders);
                        topFood.sort((a, b) => b.count - a.count);
                        if (topFood.length > 5)
                            setTopFoods.slice(0, 5);
                        else
                            setTopFoods(topFood);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                alert("Error\t" + error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} align="center">
                <h1>Statistics</h1>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3>Top 5 Items</h3>
                            </Grid>
                            {topFoods.map((food, index) => {
                                return (
                                    <Grid item xs={12} key={index}>
                                        <p>{food.name}</p>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3>Orders Placed</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{ordersPlaced}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3>Pending Orders</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{pendingOrders}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3>Completed Orders</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{completedOrders}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default VendorProfile;
