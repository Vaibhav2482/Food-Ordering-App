import { useEffect, useState } from "react";
import { Box, Button, Card, Chip, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import * as addressService from "../../services/addressService";
import AddressDialog from "../checkout/AddressDialog";

function AddressBook() {

    const { customer } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {

        loadAddresses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAddresses = async () => {

        try {

            const response = await addressService.getAddresses(customer.CustomerId);

            if (response.success) {
                setAddresses(response.data);
            }

        } catch {

            toast.error("Failed to load addresses.");

        }

    };

    const handleSave = async (formData) => {

        try {

            const response = isEditMode
                ? await addressService.updateAddress(selectedAddress.AddressId, formData)
                : await addressService.createAddress({ customerId: customer.CustomerId, ...formData });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(isEditMode ? "Address updated." : "Address added.");
            setDialogOpen(false);
            await loadAddresses();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to save address.");

        }

    };

    const handleDelete = async (address) => {

        try {

            const response = await addressService.deleteAddress(address.AddressId);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success("Address deleted.");
            await loadAddresses();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to delete address.");

        }

    };

    return (

        <Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>

                <Typography variant="h6" fontWeight={700}>
                    Saved Addresses
                </Typography>

                <Button
                    startIcon={<AddRoundedIcon />}
                    onClick={() => {
                        setSelectedAddress(null);
                        setIsEditMode(false);
                        setDialogOpen(true);
                    }}
                >
                    Add Address
                </Button>

            </Box>

            {addresses.length === 0 ? (

                <Typography color="text.secondary">No saved addresses yet.</Typography>

            ) : (

                addresses.map((address) => (

                    <Card key={address.AddressId} sx={{ p: 2, mb: 2 }}>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

                            <Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                    <Typography fontWeight={700}>{address.AddressTitle}</Typography>

                                    {address.IsDefault && <Chip label="Default" size="small" color="primary" />}

                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    {address.FullAddress}, {address.City}, {address.State} - {address.Pincode}
                                </Typography>

                            </Box>

                            <Box>

                                <IconButton
                                    onClick={() => {
                                        setSelectedAddress(address);
                                        setIsEditMode(true);
                                        setDialogOpen(true);
                                    }}
                                >
                                    <EditRoundedIcon fontSize="small" />
                                </IconButton>

                                <IconButton color="error" onClick={() => handleDelete(address)}>
                                    <DeleteOutlineRoundedIcon fontSize="small" />
                                </IconButton>

                            </Box>

                        </Box>

                    </Card>

                ))

            )}

            <AddressDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                address={selectedAddress}
                isEditMode={isEditMode}
            />

        </Box>

    );

}

export default AddressBook;
