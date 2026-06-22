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
    isActive: true

});

    useEffect(() => {

        if (isEditMode && selectedCategory) {

            setFormData({

    categoryName: selectedCategory.CategoryName,
    description: selectedCategory.Description ?? "",
    displayOrder: selectedCategory.DisplayOrder,
    isActive: selectedCategory.IsActive

});

        }
        else {

            setFormData({

    categoryName: "",
    description: "",
    displayOrder: "",
    isActive: true

});

        }

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

};

const handleSubmit = () => {

    if (formData.categoryName.trim() === "") {

        alert("Category Name is required.");

        return;

    }

if (
    !formData.displayOrder ||
    Number(formData.displayOrder) <= 0
) {

    alert("Display Order must be greater than 0.");

    return;

}

    onSave({

        categoryName: formData.categoryName,
        description: formData.description,
        displayOrder: Number(formData.displayOrder),
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
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
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
            type="number"
            label="Display Order"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
        />

    </Grid>

    <Grid
        size={{ xs: 12, md: 6 }}
        display="flex"
        alignItems="center"
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