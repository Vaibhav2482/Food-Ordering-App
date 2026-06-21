import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from "@mui/material";

const items = [
    {
        name: "Masala Tea",
        sold: 248
    },
    {
        name: "Cold Coffee",
        sold: 196
    },
    {
        name: "Veg Sandwich",
        sold: 182
    },
    {
        name: "Cheese Pizza",
        sold: 151
    }
];

function TopSellingItems() {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Top Selling Items
                </Typography>

                <List>

                    {items.map((item, index) => (

                        <div key={item.name}>

                            <ListItem>

                                <ListItemText
                                    primary={item.name}
                                    secondary={`${item.sold} Orders`}
                                />

                            </ListItem>

                            {index !== items.length - 1 && (
                                <Divider />
                            )}

                        </div>

                    ))}

                </List>

            </CardContent>

        </Card>

    );

}

export default TopSellingItems;