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

import { useEffect, useState } from "react";

const emptyForm = {
    branchName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isActive: true
};

const emptyErrors = { branchName: "" };

function BranchDialog({

    open,
    onClose,
    onSave,
    selectedBranch,
    isEditMode

}) {

    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState(emptyErrors);

    useEffect(() => {

        if (isEditMode && selectedBranch) {

            setFormData({
                branchName: selectedBranch.BranchName,
                address: selectedBranch.Address ?? "",
                city: selectedBranch.City ?? "",
                state: selectedBranch.State ?? "",
                pincode: selectedBranch.Pincode ?? "",
                phone: selectedBranch.Phone ?? "",
                isActive: selectedBranch.IsActive
            });

        } else {

            setFormData(emptyForm);

        }

        setErrors(emptyErrors);

    }, [selectedBranch, isEditMode, open]);

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
            branchName: formData.branchName.trim() === "" ? "Branch Name is required." : ""
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

            <DialogTitle>
                {isEditMode ? "Edit Branch" : "Add Branch"}
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={{ xs: 12, md: isEditMode ? 8 : 12 }}>
                        <TextField
                            fullWidth
                            required
                            label="Branch Name"
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            error={Boolean(errors.branchName)}
                            helperText={errors.branchName}
                        />
                    </Grid>

                    {isEditMode && (

                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                    />
                                }
                                label="Active"
                            />
                        </Grid>

                    )}

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
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

export default BranchDialog;
