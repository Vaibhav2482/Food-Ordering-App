import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
    LinearProgress,
    Skeleton
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

function getColor(index) {

    switch (index) {

        case 0:
            return "#FFD700";

        case 1:
            return "#C0C0C0";

        case 2:
            return "#CD7F32";

        default:
            return "#F58220";

    }

}

function TopSellingItems({

    items,
    loading

}) {

    if (loading) {

        return (

            <Paper

                elevation={0}

                sx={{

                    borderRadius: 3,

                    border: "1px solid #ECECEC",

                    p: 2.5,

                    height: 340

                }}

            >

                <Skeleton
                    height={32}
                    width={150}
                />

                <Skeleton
                    variant="rounded"
                    height={260}
                    sx={{ mt: 2 }}
                />

            </Paper>

        );

    }

    const maxSold = Math.max(

        ...items.map((item) => item.TotalQuantitySold),

        1

    );

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 3,

                border: "1px solid #ECECEC",

                p: 2.5,

                height: 340,

                overflow: "auto"

            }}

        >

            <Typography

                variant="subtitle1"

                fontWeight={700}

            >

                Top Selling Items

            </Typography>

            <Typography

                color="text.secondary"

                fontSize={12.5}

                mb={2}

            >

                Best performing menu items

            </Typography>

            {items.length === 0 && (

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 230
                    }}
                >

                    <Typography color="text.secondary">
                        No sales yet.
                    </Typography>

                </Box>

            )}

            <List disablePadding>

                {

                    items.map((item, index) => (

                        <Box

                            key={item.MenuItemId}

                        >

                            <ListItem

                                disableGutters

                                alignItems="flex-start"

                            >

                                <ListItemAvatar sx={{ minWidth: 44 }}>

                                    <Avatar

                                        sx={{

                                            bgcolor: getColor(index),

                                            color: "#fff",

                                            width: 34,

                                            height: 34,

                                            "& svg": { fontSize: 18 }

                                        }}

                                    >

                                        <EmojiEventsRoundedIcon />

                                    </Avatar>

                                </ListItemAvatar>

                                <ListItemText

                                    slotProps={{ secondary: { component: "div" } }}

                                    primary={

                                        <Box

                                            display="flex"

                                            justifyContent="space-between"

                                        >

                                            <Typography

                                                fontWeight={700}

                                                fontSize={14}

                                            >

                                                {item.ItemName}

                                            </Typography>

                                            <Typography

                                                fontWeight={700}

                                                fontSize={13}

                                                color="#F58220"

                                            >

                                                #{index + 1}

                                            </Typography>

                                        </Box>

                                    }

                                    secondary={

                                        <>

                                            <Typography

                                                variant="body2"

                                                fontSize={12.5}

                                                sx={{ mt: 0.25 }}

                                            >

                                                Sold

                                                {" "}

                                                <strong>

                                                    {item.TotalQuantitySold}

                                                </strong>

                                                {" "}Items

                                            </Typography>

                                            <Typography

                                                variant="body2"

                                                fontSize={12.5}

                                                color="#22C55E"

                                                fontWeight={700}

                                            >

                                                Revenue ₹ {item.TotalSales}

                                            </Typography>

                                            <LinearProgress

                                                variant="determinate"

                                                value={

                                                    (item.TotalQuantitySold / maxSold) * 100

                                                }

                                                sx={{

                                                    mt: 0.75,

                                                    height: 6,

                                                    borderRadius: 5

                                                }}

                                            />

                                        </>

                                    }

                                />

                            </ListItem>

                            {

                                index !== items.length - 1 &&

                                <Divider

                                    sx={{

                                        my: 1

                                    }}

                                />

                            }

                        </Box>

                    ))

                }

            </List>

        </Paper>

    );

}

export default TopSellingItems;
