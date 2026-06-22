import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CategoryToolbar from "./CategoryToolbar";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";

import {
     getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
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

const handleDeleteCategory = async (categoryId) => {

    const confirmed = window.confirm(

        "Are you sure you want to delete this category?"

    );

    if (!confirmed) {

        return;

    }

    try {

        const response = await deleteCategory(categoryId);

        if (response.success) {

            await loadCategories();

            toast.success("Category deleted successfully.");

        }

    }
    catch (error) {

        toast.error("Something went wrong.");

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
    onDelete={handleDeleteCategory}
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