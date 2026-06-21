import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";

function Header() {

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
                        sx={{
                            fontWeight: 700,
                            color: "#1F2937"
                        }}
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#6B7280"
                        }}
                    >
                        Welcome to ChaiChakhna Admin Panel
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
                            width: 320,
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
                        A
                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight={700}
                        >
                            Admin
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Administrator
                        </Typography>

                    </Box>

                    <RestaurantRoundedIcon
                        sx={{
                            color: "#0F766E",
                            fontSize: 34
                        }}
                    />

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default Header;