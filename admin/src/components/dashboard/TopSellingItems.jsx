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

                    borderRadius: 4,

                    border: "1px solid #ECECEC",

                    p: 3,

                    height: 450

                }}

            >

                <Skeleton
                    height={40}
                    width={170}
                />

                <Skeleton
                    variant="rounded"
                    height={330}
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

                borderRadius: 4,

                border: "1px solid #ECECEC",

                p: 3,

                height: 450,

                overflow: "auto"

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

            >

                Top Selling Items

            </Typography>

            <Typography

                color="text.secondary"

                fontSize={13}

                mb={3}

            >

                Best performing menu items

            </Typography>

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

                                <ListItemAvatar>

                                    <Avatar

                                        sx={{

                                            bgcolor: getColor(index),

                                            color: "#fff",

                                            width: 48,

                                            height: 48

                                        }}

                                    >

                                        <EmojiEventsRoundedIcon />

                                    </Avatar>

                                </ListItemAvatar>

                                <ListItemText

                                    primary={

                                        <Box

                                            display="flex"

                                            justifyContent="space-between"

                                        >

                                            <Typography

                                                fontWeight={700}

                                            >

                                                {item.ItemName}

                                            </Typography>

                                            <Typography

                                                fontWeight={700}

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

                                                sx={{ mt: 0.5 }}

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

                                                    mt: 1,

                                                    height: 8,

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

                                        my: 2

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