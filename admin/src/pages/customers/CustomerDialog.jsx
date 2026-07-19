import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Button,
    Grid,
    Typography
} from "@mui/material";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function DetailField({ label, value }) {

    return (

        <Box>

            <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
            </Typography>

            <Typography fontWeight={600} sx={{ wordBreak: "break-word" }}>
                {value || "—"}
            </Typography>

        </Box>

    );

}

function CustomerDialog({ open, onClose, customer, addresses, addressesLoading }) {

    if (!customer) {
        return null;
    }

    return (

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogContent sx={{ pt: 4 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>

                    <Avatar sx={{ bgcolor: "#F58220", width: 56, height: 56, fontSize: 24, fontWeight: 700 }}>
                        {(customer.FullName || "?").charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>

                        <Typography variant="h6" fontWeight={700}>
                            {customer.FullName}
                        </Typography>

                        <Chip
                            label={customer.IsActive ? "Active" : "Inactive"}
                            color={customer.IsActive ? "success" : "default"}
                            size="small"
                        />

                    </Box>

                </Box>

                <Grid container spacing={2.5}>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailField label="Phone" value={customer.Phone} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailField label="Email" value={customer.Email} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailField
                            label="Registered On"
                            value={customer.CreatedAt && new Date(customer.CreatedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            })}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailField label="Customer ID" value={`#${customer.CustomerId}`} />
                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                    Saved Addresses
                </Typography>

                {addressesLoading ? (

                    <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                        <CircularProgress size={28} color="warning" />
                    </Box>

                ) : !addresses || addresses.length === 0 ? (

                    <Typography color="text.secondary" variant="body2">
                        No saved addresses.
                    </Typography>

                ) : (

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

                        {addresses.map((address) => (

                            <Box
                                key={address.AddressId}
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                    p: 1.5,
                                    borderRadius: 2,
                                    border: "1px solid #E5E7EB",
                                    bgcolor: "#FAFAFA"
                                }}
                            >

                                <LocationOnRoundedIcon sx={{ color: "#F58220", mt: 0.25 }} fontSize="small" />

                                <Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                        <Typography fontWeight={600} variant="body2">
                                            {address.AddressTitle}
                                        </Typography>

                                        {address.IsDefault && (
                                            <Chip label="Default" size="small" color="warning" variant="outlined" />
                                        )}

                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        {address.FullAddress}
                                        {address.Landmark ? `, ${address.Landmark}` : ""}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {address.City}, {address.State} — {address.Pincode}
                                    </Typography>

                                </Box>

                            </Box>

                        ))}

                    </Box>

                )}

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Close
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default CustomerDialog;
