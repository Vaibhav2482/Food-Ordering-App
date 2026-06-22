import {
    Box,
    Typography,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { NavLink } from "react-router-dom";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";





const menuItems = [

    {
        text: "Dashboard",
        path: "/dashboard",
        icon: <DashboardRoundedIcon />
    },

    {
        text: "Categories",
        path: "/category",
        icon: <CategoryRoundedIcon />
    },

    {
        text: "Menu",
        path: "/menu",
        icon: <RestaurantMenuRoundedIcon />
    },

    {
        text: "Orders",
        path: "/orders",
        icon: <ShoppingCartRoundedIcon />
    },

    {
        text: "Customers",
        path: "/customers",
        icon: <PeopleRoundedIcon />
    },

{
    text: "Reports",
    path: "/reports",
    icon: <AssessmentRoundedIcon />
}

];

function Sidebar() {

    return (

        <Box
            sx={{
                width: 280,
                height: "100vh",
                bgcolor: "#FFFFFF",
                borderRight: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <Box
                sx={{
                    px: 3,
                    py: 3
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        color: "#F58220"
                    }}
                >
                    Chai Chakhna Company
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6B7280",
                        mt: 0.5
                    }}
                >
                    Restaurant Management
                </Typography>

            </Box>

            <Divider />

            <Box
                sx={{
                    flex: 1,
                    p: 2
                }}
            >

                <Typography
                    sx={{
                        color: "#9CA3AF",
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        mb: 2
                    }}
                >
                    Main Menu
                </Typography>

                <List>

                    {

                        menuItems.map((item) => (

                            <ListItemButton

                                key={item.text}

                                component={NavLink}

                                to={item.path}

                                sx={{

                                    borderRadius: 2,

                                    mb: 1,

                                    color: "#374151",

                                    "&.active": {

                                        bgcolor: "#F58220",

                                        color: "#FFFFFF",

                                        "& .MuiListItemIcon-root": {

                                            color: "#FFFFFF"

                                        }

                                    }

                                }}

                            >

                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: "inherit"
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />

                            </ListItemButton>

                        ))

                    }

                </List>

            </Box>

        </Box>

    );

}

export default Sidebar;