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
import ImageUploadField from "../../components/common/ImageUploadField";

const emptyErrors = { categoryName: "", displayOrder: "" };

function CategoryDialog({

    open,
    onClose,
    onSave,
    selectedCategory,
    isEditMode

}) {

   const [formData, setFormData] = useState({

    categoryName: "",
    description: "",
    displayOrder: "",
    imageUrl: "",
    isActive: true

});

    const [errors, setErrors] = useState(emptyErrors);

    useEffect(() => {

        if (isEditMode && selectedCategory) {

            setFormData({

    categoryName: selectedCategory.CategoryName,
    description: selectedCategory.Description ?? "",
    displayOrder: selectedCategory.DisplayOrder,
    imageUrl: selectedCategory.ImageUrl ?? "",
    isActive: selectedCategory.IsActive

});

        }
        else {

            setFormData({

    categoryName: "",
    description: "",
    displayOrder: "",
    imageUrl: "",
    isActive: true

});

        }

        setErrors(emptyErrors);

    }, [selectedCategory, isEditMode, open]);

const handleChange = (event) => {

    const {
        name,
        value,
        checked,
        type
    } = event.target;

    setFormData((prev) => ({

        ...prev,
        [name]:
            type === "checkbox"
                ? checked
                : value

    }));

    if (errors[name]) {

        setErrors((prev) => ({ ...prev, [name]: "" }));

    }

};

const validate = () => {

    const nextErrors = { ...emptyErrors };

    if (formData.categoryName.trim() === "") {
        nextErrors.categoryName = "Category Name is required.";
    }

    if (!formData.displayOrder || Number(formData.displayOrder) <= 0) {
        nextErrors.displayOrder = "Display Order must be greater than 0.";
    }

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => error === "");

};

const handleSubmit = () => {

    if (!validate()) {

        return;

    }

    onSave({

        categoryName: formData.categoryName,
        description: formData.description,
        displayOrder: Number(formData.displayOrder),
        imageUrl: formData.imageUrl || null,
        isActive: formData.isActive

    });

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

                        ? "Edit Category"

                        : "Add Category"

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
            required
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
        />

    </Grid>

    <Grid size={{ xs: 12 }}>

        <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
        />

    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>

        <TextField
            fullWidth
            required
            type="number"
            label="Display Order"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            error={Boolean(errors.displayOrder)}
            helperText={errors.displayOrder}
        />

    </Grid>

    <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center" }}
    >

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

    <Grid size={{ xs: 12, md: 6 }}>

        <ImageUploadField
            label="Category Photo"
            value={formData.imageUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
        />

    </Grid>

</Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >

                    {

                        isEditMode

                            ? "Update"

                            : "Save"

                    }

                </Button>

            </DialogActions>

        </Dialog>

    );

  }

export default CategoryDialog;
