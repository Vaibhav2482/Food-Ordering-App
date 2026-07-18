import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Switch,
    TextField
} from "@mui/material";

const emptyForm = {
    addressTitle: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false
};

const emptyErrors = {
    addressTitle: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: ""
};

function AddressDialog({ open, onClose, onSave, address, isEditMode }) {

    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState(emptyErrors);

    useEffect(() => {

        if (isEditMode && address) {

            setFormData({
                addressTitle: address.AddressTitle,
                fullAddress: address.FullAddress,
                city: address.City,
                state: address.State,
                pincode: address.Pincode,
                landmark: address.Landmark ?? "",
                isDefault: address.IsDefault
            });

        } else {

            setFormData(emptyForm);

        }

        setErrors(emptyErrors);

    }, [address, isEditMode, open]);

    const handleChange = (event) => {

        const { name, value, checked, type } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

    };

    const validate = () => {

        const nextErrors = {
            addressTitle: formData.addressTitle.trim() === "" ? "Required." : "",
            fullAddress: formData.fullAddress.trim() === "" ? "Required." : "",
            city: formData.city.trim() === "" ? "Required." : "",
            state: formData.state.trim() === "" ? "Required." : "",
            pincode: formData.pincode.trim() === "" ? "Required." : ""
        };

        setErrors(nextErrors);

        return Object.values(nextErrors).every((error) => error === "");

    };

    const handleSubmit = () => {

        if (!validate()) {
            return;
        }

        onSave(formData);

    };

    return (

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>{isEditMode ? "Edit Address" : "Add New Address"}</DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Address Title (e.g. Home, Work)"
                            name="addressTitle"
                            value={formData.addressTitle}
                            onChange={handleChange}
                            error={Boolean(errors.addressTitle)}
                            helperText={errors.addressTitle}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                />
                            }
                            label="Set as default address"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={2}
                            label="Full Address"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            error={Boolean(errors.fullAddress)}
                            helperText={errors.fullAddress}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={Boolean(errors.city)}
                            helperText={errors.city}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            error={Boolean(errors.state)}
                            helperText={errors.state}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            error={Boolean(errors.pincode)}
                            helperText={errors.pincode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Landmark (optional)"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>Cancel</Button>

                <Button variant="contained" onClick={handleSubmit}>
                    {isEditMode ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default AddressDialog;
