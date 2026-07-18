import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";

import { useEffect, useState } from "react";

const emptyErrors = { fullName: "", email: "", phone: "" };

function CustomerDialog({

    open,
    onClose,
    onSave,
    customer,
    isEditMode

}) {

    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        phone: ""

    });

    const [errors, setErrors] = useState(emptyErrors);

    useEffect(() => {

        if (customer) {

            setFormData({

                fullName: customer.FullName,
                email: customer.Email,
                phone: customer.Phone

            });

        }

        setErrors(emptyErrors);

    }, [customer, open]);

    const handleChange = (event) => {

        const {

            name,
            value

        } = event.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value

        }));

        if (errors[name]) {

            setErrors((prev) => ({ ...prev, [name]: "" }));

        }

    };

    const validate = () => {

        const nextErrors = { ...emptyErrors };

        if (formData.fullName.trim() === "") {
            nextErrors.fullName = "Full Name is required.";
        }

        if (formData.email.trim() === "") {
            nextErrors.email = "Email is required.";
        }

        if (formData.phone.trim() === "") {
            nextErrors.phone = "Phone is required.";
        }

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

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

           <DialogTitle>

    {

        isEditMode

            ? "Edit Customer"

            : "Customer Details"

    }

</DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            required={isEditMode}
                            disabled={!isEditMode}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            required={isEditMode}
                            disabled={!isEditMode}
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            required={isEditMode}
                            disabled={!isEditMode}
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

    <Button onClick={onClose}>

        {

            isEditMode

                ? "Cancel"

                : "Close"

        }

    </Button>

    {

        isEditMode && (

            <Button
                variant="contained"
                onClick={handleSubmit}
            >

                Update

            </Button>

        )

    }

</DialogActions>

        </Dialog>

    );

}

export default CustomerDialog;
