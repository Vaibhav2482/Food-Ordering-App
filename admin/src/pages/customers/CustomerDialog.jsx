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

    useEffect(() => {

        if (customer) {

            setFormData({

                fullName: customer.FullName,
                email: customer.Email,
                phone: customer.Phone

            });

        }

    }, [customer]);

    const handleChange = (event) => {

        const {

            name,
            value

        } = event.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value

        }));

    };

    const handleSubmit = () => {

        if (formData.fullName.trim() === "") {

            return;

        }

        if (formData.email.trim() === "") {

            return;

        }

        if (formData.phone.trim() === "") {

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
                            disabled={!isEditMode}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            disabled={!isEditMode}
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            disabled={!isEditMode}
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
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