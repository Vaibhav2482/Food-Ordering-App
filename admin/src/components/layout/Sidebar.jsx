import {
    Box,
    Typography,
    Divider,
    Drawer,
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
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

const SIDEBAR_WIDTH = 280;

const menuItems = [

    {
        text: "Orders",
        path: "/orders",
        icon: <ShoppingCartRoundedIcon />
    },

    {
        text: "Dine In",
        path: "/dine-in",
        icon: <RoomServiceRoundedIcon />
    },

    {
        text: "Tables",
        path: "/tables",
        icon: <TableRestaurantRoundedIcon />
    },

    {
        text: "Branches",
        path: "/branches",
        icon: <StoreRoundedIcon />,
        ownerOnly: true
    },

    {
        text: "Admins",
        path: "/admins",
        icon: <AdminPanelSettingsRoundedIcon />,
        ownerOnly: true
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
        text: "Dashboard",
        path: "/dashboard",
        icon: <DashboardRoundedIcon />
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

function SidebarContent({ onNavigate }) {

    const ownerMode = isOwner(getStoredAdmin());

    const visibleMenuItems = menuItems.filter((item) => !item.ownerOnly || ownerMode);

    return (

        <Box
            sx={{
                width: SIDEBAR_WIDTH,
                height: "100%",
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto"
            }}
        >

            <Box sx={{ px: 3, py: 3 }}>

                <Typography variant="h5" sx={{ fontWeight: 800, color: "#F58220" }}>
                    Chai Chakhna Company
                </Typography>

                <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                    Restaurant Management
                </Typography>

            </Box>

            <Divider />

            <Box sx={{ flex: 1, p: 2 }}>

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

                    {visibleMenuItems.map((item) => (

                        <ListItemButton
                            key={item.text}
                            component={NavLink}
                            to={item.path}
                            onClick={onNavigate}
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

                            <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.text} />

                        </ListItemButton>

                    ))}

                </List>

            </Box>

        </Box>

    );

}

function Sidebar({ mobileOpen, onCloseMobile }) {

    return (

        <>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onCloseMobile}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" }
                }}
            >
                <SidebarContent onNavigate={onCloseMobile} />
            </Drawer>

            <Box
                component="nav"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: SIDEBAR_WIDTH,
                    flexShrink: 0,
                    height: "100vh",
                    borderRight: "1px solid #E5E7EB"
                }}
            >
                <SidebarContent />
            </Box>

        </>

    );

}

export default Sidebar;
