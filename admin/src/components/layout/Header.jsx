import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function Header() {

    const navigate = useNavigate();

    const location = useLocation();

    const admin = JSON.parse(

        localStorage.getItem("admin")

    );

    const pageTitle = {

        "/dashboard": "Dashboard",

        "/category": "Categories",

        "/menu": "Menu",

        "/orders": "Orders",

        "/customers": "Customers",

        "/reports": "Reports"

    };

const handleLogout = () => {

    localStorage.clear();

    navigate(

        "/login",

        {

            replace: true

        }

    );

};

    return (

        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                borderBottom: "1px solid #E5E7EB"
            }}
        >

            <Toolbar
                sx={{
                    height: 72,
                    justifyContent: "space-between"
                }}
            >

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >

                        {

                            pageTitle[location.pathname]

                            ||

                            "Dashboard"

                        }

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        Welcome to ChaiChakhnaCompany Admin Panel

                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 2,
                            py: 0.5,
                            width: 300,
                            border: "1px solid #E5E7EB",
                            borderRadius: 3
                        }}
                    >

                        <SearchRoundedIcon
                            sx={{
                                color: "#9CA3AF",
                                mr: 1
                            }}
                        />

                        <InputBase
                            placeholder="Search..."
                            sx={{
                                flex: 1
                            }}
                        />

                    </Paper>

                    <IconButton>

                        <Badge
                            badgeContent={4}
                            color="primary"
                        >

                            <NotificationsNoneRoundedIcon />

                        </Badge>

                    </IconButton>

                    <Avatar
                        sx={{
                            bgcolor: "#F58220",
                            width: 42,
                            height: 42
                        }}
                    >

                        {

                            admin?.FullName?.charAt(0)

                            ||

                            "A"

                        }

                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight={700}
                        >

                            {

                                admin?.FullName

                                ||

                                "Administrator"

                            }

                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >

                            {

                                admin?.Email

                                ||

                                ""

                            }

                        </Typography>

                    </Box>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutRoundedIcon />}
                        onClick={handleLogout}
                    >

                        Logout

                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default Header;