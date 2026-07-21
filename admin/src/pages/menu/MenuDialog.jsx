import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageUploadField from "../../components/common/ImageUploadField";

const emptyErrors = { itemName: "", categoryId: "", price: "" };

function MenuDialog({

    open,
    onClose,
    categories,
    onSave,
     selectedMenu,
    isEditMode


})

    {

    const [formData, setFormData] = useState({

        categoryId: "",
        itemName: "",
        description: "",
        price: "",
        imageUrl: "",
        isAvailable: true,
        isPopular: false,
        isActive: true

    });

    const [errors, setErrors] = useState(emptyErrors);

    const handleChange = (event) => {

        const {
            name,
            value,
            checked,
            type
        } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));

        if (errors[name]) {

            setErrors((prev) => ({ ...prev, [name]: "" }));

        }

    };

    useEffect(() => {

    if (isEditMode && selectedMenu) {

        setFormData({

            categoryId: selectedMenu.CategoryId,
            itemName: selectedMenu.ItemName,
            description: selectedMenu.Description ?? "",
            price: selectedMenu.Price,
            imageUrl: selectedMenu.ImageUrl ?? "",
            isAvailable: selectedMenu.IsAvailable,
            isPopular: selectedMenu.IsPopular,
            isActive: selectedMenu.IsActive

        });

    }
    else {

        setFormData({

            categoryId: "",
            itemName: "",
            description: "",
            price: "",
            imageUrl: "",
            isAvailable: true,
            isPopular: false,
            isActive: true

        });

    }

    setErrors(emptyErrors);

}, [selectedMenu, isEditMode, open]);

    const validate = () => {

        const nextErrors = { ...emptyErrors };

        if (formData.itemName.trim() === "") {
            nextErrors.itemName = "Item Name is required.";
        }

        if (formData.categoryId === "") {
            nextErrors.categoryId = "Category is required.";
        }

        if (formData.price === "" || Number(formData.price) <= 0) {
            nextErrors.price = "Price must be greater than 0.";
        }

        setErrors(nextErrors);

        return Object.values(nextErrors).every((error) => error === "");

    };

    const handleSubmit = () => {

    if (!validate()) {

        return;

    }

    onSave({

        categoryId: Number(formData.categoryId),
        itemName: formData.itemName,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl || null,
        isAvailable: formData.isAvailable,
        isPopular: formData.isPopular,
        isActive: formData.isActive

    });

};


    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

    {

        isEditMode

            ? "Edit Menu Item"

            : "Add Menu Item"

    }

</DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                       <TextField
    fullWidth
    required
    label="Item Name"
    name="itemName"
    value={formData.itemName}
    onChange={handleChange}
    error={Boolean(errors.itemName)}
    helperText={errors.itemName}
/>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <FormControl fullWidth required error={Boolean(errors.categoryId)}>

                            <InputLabel>
                                Category
                            </InputLabel>

                            <Select
    label="Category"
    name="categoryId"
    value={formData.categoryId}
    onChange={handleChange}
>

                                {
                                    categories.map(category => (

                                        <MenuItem
                                            key={category.CategoryId}
                                            value={category.CategoryId}
                                        >

                                            {category.CategoryName}

                                        </MenuItem>

                                    ))
                                }

                            </Select>

                            {errors.categoryId && (
                                <FormHelperText>{errors.categoryId}</FormHelperText>
                            )}

                        </FormControl>

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
    label="Price"
    name="price"
    value={formData.price}
    onChange={handleChange}
    error={Boolean(errors.price)}
    helperText={errors.price}
/>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <ImageUploadField
                            label="Item Photo"
                            value={formData.imageUrl}
                            onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <FormControlLabel
                            control={<Switch
    name="isAvailable"
    checked={formData.isAvailable}
    onChange={handleChange}
/>}
                            label="Available"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <FormControlLabel
                            control={<Switch
    name="isPopular"
    checked={formData.isPopular}
    onChange={handleChange}
/>}
                            label="Popular"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <FormControlLabel
                            control={<Switch
    name="isActive"
    checked={formData.isActive}
    onChange={handleChange}
/>}
                            label="Visible to Customers"
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
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

export default MenuDialog;
