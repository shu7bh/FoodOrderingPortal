import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/home/Home";
import Register from "./components/home/Register";
import Login from "./components/home/Login";
import HomeNavbar from "./components/home/homeNavbar.js";

import BuyerNavbar from "./components/buyers/buyerNavbar.js";
import BuyerProfile from "./components/buyers/buyerProfile";
import BuyerDashboard from "./components/buyers/buyerDashboard.js";
import BuyerMyOrders from "./components/buyers/buyerMyOrders";
import BuyerWallet from "./components/buyers/buyerWallet.js";

import VendorNavbar from "./components/vendors/vendorNavbar.js";
import VendorProfile from "./components/vendors/vendorProfile";
import VendorDashboard from "./components/vendors/vendorDashboard.js";
import VendorMyOrders from "./components/vendors/vendorMyOrders";
import VendorStatistics from "./components/vendors/vendorStatistics";

const VendorNavbarLayout = () => {
    return (
        <div>
        <VendorNavbar />
        <div className="container">
        <Outlet />
        </div>
        </div>
    );
};

const BuyerNavbarLayout = () => {
    return (
        <div>
        <BuyerNavbar />
        <div className="container">
        <Outlet />
        </div>
        </div>
    );
};

const HomeNavBarLayout = () => {
    return (
        <div>
        <HomeNavbar />
        <div className="container">
        <Outlet />
        </div>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeNavBarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<BuyerNavbarLayout />}>
            <Route path="/buyer/profile" element={<BuyerProfile />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/myorders" element={<BuyerMyOrders />} />
            <Route path="/buyer/wallet" element={<BuyerWallet />} />
            </Route>
            <Route path="/" element={<VendorNavbarLayout />}>
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/myorders" element={<VendorMyOrders />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/statistics" element={<VendorStatistics />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
