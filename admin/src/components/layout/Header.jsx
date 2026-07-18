import {
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function Header({ onMenuClick }) {

    const navigate = useNavigate();
    const location = useLocation();
    const admin = getStoredAdmin();

    const pageTitle = {
        "/orders": "Orders",
        "/dashboard": "Dashboard",
        "/branches": "Branches",
        "/admins": "Admins",
        "/tables": "Tables",
        "/category": "Categories",
        "/menu": "Menu",
        "/dine-in": "Dine In",
        "/customers": "Customers",
        "/reports": "Reports"
    };

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login", { replace: true });

    };

    return (

        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                borderBottom: "1px solid #E5E7EB",
                flexShrink: 0
            }}
        >

            <Toolbar sx={{ height: { xs: 56, md: 72 }, justifyContent: "space-between", gap: 1 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>

                    <IconButton
                        onClick={onMenuClick}
                        sx={{ display: { xs: "inline-flex", md: "none" }, flexShrink: 0 }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>

                    <Box sx={{ minWidth: 0 }}>

                        <Typography variant="h5" fontWeight={700} noWrap>
                            {pageTitle[location.pathname] || "Dashboard"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            Welcome to ChaiChakhnaCompany Admin Panel
                        </Typography>

                    </Box>

                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>

                    <Chip
                        icon={isOwner(admin) ? <PublicRoundedIcon /> : <StoreRoundedIcon />}
                        label={isOwner(admin) ? "All Branches (Owner)" : admin?.BranchName || "Unassigned Branch"}
                        color={isOwner(admin) ? "default" : "primary"}
                        variant={isOwner(admin) ? "outlined" : "filled"}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                    />

                    <IconButton sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                        <NotificationsNoneRoundedIcon />
                    </IconButton>

                    <Avatar sx={{ bgcolor: "#F58220", width: { xs: 34, md: 42 }, height: { xs: 34, md: 42 } }}>
                        {admin?.FullName?.charAt(0) || "A"}
                    </Avatar>

                    <Box sx={{ display: { xs: "none", md: "block" } }}>

                        <Typography fontWeight={700} noWrap>
                            {admin?.FullName || "Administrator"}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" noWrap>
                            {admin?.Email || ""}
                        </Typography>

                    </Box>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutRoundedIcon />}
                        onClick={handleLogout}
                        sx={{ display: { xs: "none", sm: "inline-flex" } }}
                    >
                        Logout
                    </Button>

                    <IconButton
                        color="error"
                        onClick={handleLogout}
                        sx={{ display: { xs: "inline-flex", sm: "none" } }}
                    >
                        <LogoutRoundedIcon />
                    </IconButton>

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default Header;
