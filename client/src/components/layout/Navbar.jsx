import { useState } from "react";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import BranchSelector from "./BranchSelector";
import LocationBar from "./LocationBar";
import logo from "../../assets/logo/chaichakhna-logo.jpg";

function Navbar({ onCartClick }) {

    const { customer, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {

        setAnchorEl(null);
        logout();
        navigate("/");

    };

    return (

        <AppBar position="sticky" elevation={0}>

            <Toolbar sx={{ height: { xs: 56, md: 72 }, gap: { xs: 1, md: 2 } }}>

                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 1,
                        textDecoration: "none",
                        flexShrink: 0
                    }}
                >

                    <Box
                        component="img"
                        src={logo}
                        alt="Chai Chakhna Company"
                        sx={{ height: 40, width: 40, objectFit: "contain" }}
                    />

                    <Typography variant="h5" fontWeight={800} sx={{ color: "#F58220" }}>
                        Chai Chakhna Company
                    </Typography>

                </Box>

                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <BranchSelector />
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, flexGrow: 1 }}>

                    <Button component={RouterLink} to="/" color="inherit">
                        Home
                    </Button>

                    <Button component={RouterLink} to="/menu" color="inherit">
                        Menu
                    </Button>

                </Box>

                <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, minWidth: 0, alignItems: "center" }}>
                    <LocationBar />
                </Box>

                {isAuthenticated && (
                    <IconButton
                        component={RouterLink}
                        to="/orders"
                        title="My Orders"
                        sx={{ display: { xs: "none", md: "inline-flex" } }}
                    >
                        <ReceiptLongRoundedIcon />
                    </IconButton>
                )}

                <IconButton onClick={onCartClick} title="Cart" sx={{ display: { xs: "none", md: "inline-flex" } }}>
                    <Badge badgeContent={itemCount} color="primary">
                        <ShoppingCartRoundedIcon />
                    </Badge>
                </IconButton>

                {isAuthenticated ? (

                    <>

                        <IconButton
                            component={RouterLink}
                            to="/profile"
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                        >
                            <Avatar sx={{ bgcolor: "#F58220", width: 32, height: 32 }}>
                                {customer?.FullName?.charAt(0) || "U"}
                            </Avatar>
                        </IconButton>

                        <IconButton
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{ display: { xs: "none", md: "inline-flex" } }}
                        >

                            <Avatar sx={{ bgcolor: "#F58220", width: 36, height: 36 }}>
                                {customer?.FullName?.charAt(0) || "U"}
                            </Avatar>

                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >

                            <MenuItem
                                component={RouterLink}
                                to="/profile"
                                onClick={() => setAnchorEl(null)}
                            >
                                <PersonRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                                Profile
                            </MenuItem>

                            <MenuItem
                                component={RouterLink}
                                to="/orders"
                                onClick={() => setAnchorEl(null)}
                            >
                                <ReceiptLongRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                                My Orders
                            </MenuItem>

                            <MenuItem onClick={handleLogout}>
                                <LogoutRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>

                        </Menu>

                    </>

                ) : (

                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/login"
                        size="small"
                        sx={{ px: { xs: 1.5, md: 2 }, flexShrink: 0 }}
                    >
                        Login
                    </Button>

                )}

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;
