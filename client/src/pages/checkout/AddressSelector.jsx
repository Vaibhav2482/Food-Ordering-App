import { Box, Button, Card, Chip, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function AddressSelector({ addresses, selectedAddressId, onSelect, onAddNew }) {

    if (addresses.length === 0) {

        return (

            <Card sx={{ p: 3, textAlign: "center" }}>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    You don&apos;t have any saved addresses yet.
                </Typography>

                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onAddNew}>
                    Add Delivery Address
                </Button>

            </Card>

        );

    }

    return (

        <Box>

            <RadioGroup
                value={selectedAddressId || ""}
                onChange={(event) => onSelect(Number(event.target.value))}
            >

                {addresses.map((address) => (

                    <Card
                        key={address.AddressId}
                        sx={{
                            p: 2,
                            mb: 2,
                            border: "1px solid",
                            borderColor: Number(selectedAddressId) === address.AddressId ? "#F58220" : "#E5E7EB"
                        }}
                    >

                        <FormControlLabel
                            value={address.AddressId}
                            control={<Radio />}
                            sx={{ alignItems: "flex-start", width: "100%" }}
                            label={

                                <Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                        <Typography fontWeight={700}>{address.AddressTitle}</Typography>

                                        {address.IsDefault && <Chip label="Default" size="small" color="primary" />}

                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        {address.FullAddress}, {address.City}, {address.State} - {address.Pincode}
                                    </Typography>

                                    {address.Landmark && (
                                        <Typography variant="body2" color="text.secondary">
                                            Landmark: {address.Landmark}
                                        </Typography>
                                    )}

                                </Box>

                            }
                        />

                    </Card>

                ))}

            </RadioGroup>

            <Button startIcon={<AddRoundedIcon />} onClick={onAddNew}>
                Add New Address
            </Button>

        </Box>

    );

}

export default AddressSelector;
