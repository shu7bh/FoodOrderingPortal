import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const HomeNavbar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={() => navigate("/buyer/Dashboard")}>
                    Dashboard
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={() => navigate("/buyer/wallet")}>
                    My Wallet
                </Button>
                <Button color="inherit" onClick={() => navigate("/buyer/myorders")}>
                    My Orders
                </Button>
                <Button color="inherit" onClick={() => navigate("/buyer/profile")}>
                    My Profile
                </Button>
                <Button color="inherit" onClick={() => {
                    navigate("/");
                    localStorage.clear();
                }}>
                    Log Out
                </Button>
            </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HomeNavbar;
