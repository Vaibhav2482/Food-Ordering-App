import { Badge, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const routeToValue = (pathname) => {

    if (pathname === "/" || pathname.startsWith("/menu")) return "menu";
    if (pathname.startsWith("/orders")) return "orders";
    if (pathname.startsWith("/profile")) return "profile";

    return false;

};

function BottomNav({ onCartClick }) {

    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { itemCount } = useCart();

    const goProtected = (path) => {

        if (isAuthenticated) {
            navigate(path);
        } else {
            navigate("/login", { state: { from: { pathname: path } } });
        }

    };

    return (

        <Paper
            elevation={8}
            sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                borderTop: "1px solid #E5E7EB"
            }}
        >

            <BottomNavigation value={routeToValue(location.pathname)} showLabels sx={{ height: 64 }}>

                <BottomNavigationAction
                    label="Menu"
                    value="menu"
                    icon={<RestaurantMenuRoundedIcon />}
                    onClick={() => navigate("/menu")}
                />

                <BottomNavigationAction
                    label="Cart"
                    value="cart"
                    icon={
                        <Badge badgeContent={itemCount} color="primary">
                            <ShoppingCartRoundedIcon />
                        </Badge>
                    }
                    onClick={onCartClick}
                />

                <BottomNavigationAction
                    label="Orders"
                    value="orders"
                    icon={<ReceiptLongRoundedIcon />}
                    onClick={() => goProtected("/orders")}
                />

                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<PersonRoundedIcon />}
                    onClick={() => goProtected("/profile")}
                />

            </BottomNavigation>

        </Paper>

    );

}

export default BottomNav;
