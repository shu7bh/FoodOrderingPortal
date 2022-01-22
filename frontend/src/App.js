import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import HomeNavbar from "./components/Navbar/homeNavbar.js";
import BuyerNavbar from "./components/Navbar/buyerNavbar.js";
import VendorNavbar from "./components/Navbar/vendorNavbar.js";
import BuyerProfile from "./components/buyers/buyerProfile";
import VendorProfile from "./components/vendors/vendorProfile";
import BuyerDashboard from "./components/buyers/buyerDashboard.js";
import VendorDashboard from "./components/vendors/vendorDashboard.js";
import BuyerMyOrders from "./components/buyers/buyerMyOrders";
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
            <Route path="/buyer/buyerProfile" element={<BuyerProfile />} />
            <Route path="/buyer/buyerDashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/buyerMyOrders" element={<BuyerMyOrders />} />
            </Route>
            <Route path="/" element={<VendorNavbarLayout />}>
            <Route path="/vendor/vendorProfile" element={<VendorProfile />} />
            <Route path="/vendor/vendorDashboard" element={<VendorDashboard />} />
            <Route path="/vendor/vendorStatistics" element={<VendorStatistics />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
