import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";

const emptyForm = {
    fullName: "",
    email: "",
    password: "",
    branchId: "owner",
    isActive: true
};

const emptyErrors = { fullName: "", email: "", password: "" };

function AdminDialog({

    open,
    onClose,
    onSave,
    selectedAdmin,
    isEditMode,
    branches

}) {

    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState(emptyErrors);

    useEffect(() => {

        if (isEditMode && selectedAdmin) {

            setFormData({
                fullName: selectedAdmin.FullName,
                email: selectedAdmin.Email,
                password: "",
                branchId: selectedAdmin.BranchId ?? "owner",
                isActive: selectedAdmin.IsActive
            });

        } else {

            setFormData(emptyForm);

        }

        setErrors(emptyErrors);

    }, [selectedAdmin, isEditMode, open]);

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
            fullName: formData.fullName.trim() === "" ? "Full Name is required." : "",
            email: formData.email.trim() === "" ? "Email is required." : "",
            password: !isEditMode && formData.password.trim() === "" ? "Password is required." : ""
        };

        setErrors(nextErrors);

        return Object.values(nextErrors).every((error) => error === "");

    };

    const handleSubmit = () => {

        if (!validate()) {
            return;
        }

        const payload = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            branchId: formData.branchId === "owner" ? null : formData.branchId,
            isActive: formData.isActive
        };

        if (!isEditMode) {
            payload.password = formData.password;
        }

        onSave(payload);

    };

    return (

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>
                {isEditMode ? "Edit Admin" : "Add Admin"}
            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={{ xs: 12, md: isEditMode ? 8 : 12 }}>
                        <TextField
                            fullWidth
                            required
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
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

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>

                    {!isEditMode && (

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                        </Grid>

                    )}

                    <Grid size={{ xs: 12 }}>

                        <FormControl fullWidth>

                            <InputLabel>Branch</InputLabel>

                            <Select
                                label="Branch"
                                name="branchId"
                                value={formData.branchId}
                                onChange={handleChange}
                            >

                                <MenuItem value="owner">
                                    Owner — all branches
                                </MenuItem>

                                {branches.map((branch) => (
                                    <MenuItem key={branch.BranchId} value={branch.BranchId}>
                                        {branch.BranchName}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                            An Owner can see and operate every branch. A Branch Admin is
                            permanently locked to the one branch chosen here.
                        </Typography>

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

export default AdminDialog;
