import { Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CategoryToolbar from "./CategoryToolbar";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";

import {
     getAllCategories,
    createCategory,
    updateCategory
} from "../../services/categoryService";

function Category() {

    const [categories, setCategories] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            setLoading(true);

            const response = await getAllCategories();

            if (response.success) {

                setCategories(response.data);

            }

        }
        catch (error) {

            toast.error("Something went wrong.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleCreateCategory = async (category) => {

    try {

        const response = await createCategory(category);

        if (response.success) {

            await loadCategories();

            toast.success("Category created successfully.");

            setOpenDialog(false);

        }

    }
    catch (error) {

        toast.error("Something went wrong.");

    }

};

const handleUpdateCategory = async (category) => {

    try {

        const response = await updateCategory(

            selectedCategory.CategoryId,

            category

        );

        if (response.success) {

            await loadCategories();

            toast.success("Category updated successfully.");

            setOpenDialog(false);

            setSelectedCategory(null);

            setIsEditMode(false);

        }

    }
    catch (error) {

        toast.error("Something went wrong.");

    }

};

const handleToggleActive = async (category) => {

    try {

        const response = await updateCategory(category.CategoryId, {

            categoryName: category.CategoryName,
            description: category.Description,
            displayOrder: category.DisplayOrder,
            isActive: !category.IsActive

        });

        if (response.success) {

            await loadCategories();

            toast.success(
                category.IsActive
                    ? "Category hidden from customers."
                    : "Category is now visible to customers."
            );

        }

    }
    catch (error) {

        toast.error(
            error.response?.data?.message || "Something went wrong."
        );

    }

};

const handleEditCategory = (category) => {

    setSelectedCategory(category);

    setIsEditMode(true);

    setOpenDialog(true);

};

    const filteredCategories = categories.filter((category) =>
        category.CategoryName
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (

        <Box>

            <Alert severity="info" sx={{ mb: 2 }}>
                Categories are shared across all branches — every branch's menu uses this
                same list. To control which items a specific branch sells, use Menu
                Management and pick the branch there.
            </Alert>

            <CategoryToolbar
                searchText={searchText}
                setSearchText={setSearchText}
                onAddClick={() => {

                    setSelectedCategory(null);

                    setIsEditMode(false);

                    setOpenDialog(true);

                }}
            />

           <CategoryTable
    categories={filteredCategories}
    loading={loading}
    onEdit={handleEditCategory}
    onToggleActive={handleToggleActive}
/>

            <CategoryDialog
    open={openDialog}
    onClose={() => {

        setOpenDialog(false);

        setSelectedCategory(null);

        setIsEditMode(false);

    }}
    onSave={
        isEditMode
            ? handleUpdateCategory
            : handleCreateCategory
    }
    selectedCategory={selectedCategory}
    isEditMode={isEditMode}
/>

        </Box>

    );

}

export default Category;
