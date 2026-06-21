import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuToolbar from "./MenuToolbar";
import MenuTable from "./MenuTable";
import MenuDialog from "./MenuDialog";
import {
    getAllMenu,
    createMenu,
    updateMenu,
    deleteMenu
} from "../../services/menuService";
import { getAllCategories } from "../../services/categoryService";

function Menu() {

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadMenu();
        loadCategories();

    }, []);

    const loadMenu = async () => {

        try {

            setLoading(true);
            const response = await getAllMenu();

            if (response.success) {

                setMenuItems(response.data);

            }

        }
        catch (error) {

            toast.error("Something went wrong.");

        }
        finally {

            setLoading(false);

        }

    };

    const loadCategories = async () => {

        try {

            const response = await getAllCategories();

            console.log(response);

            if (response.success) {

                setCategories(response.data);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleCreateMenu = async (menuItem) => {

        try {

            const response = await createMenu(menuItem);

            if (response.success) {

                await loadMenu();
                toast.success("Menu item created successfully.");
                setOpenDialog(false);

            }

        } catch (error) {

            toast.error("Something went wrong.");

        }

    };

    const handleUpdateMenu = async (menuItem) => {

        try {

            const response = await updateMenu(

                selectedMenu.MenuItemId,

                menuItem

            );

            if (response.success) {

                await loadMenu();
                toast.success("Menu item updated successfully.");
                setOpenDialog(false);

                setSelectedMenu(null);

                setIsEditMode(false);

            }

        }
        catch (error) {

            toast.error("Something went wrong.");

        }

    };

    const handleDeleteMenu = async (menuItemId) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this menu item?"

        );

        if (!confirmed) {

            return;

        }

        try {

            const response = await deleteMenu(menuItemId);

            if (response.success) {

                await loadMenu();
                toast.success("Menu item deleted successfully.");
            }

        }
        catch (error) {

            console.error(error);

        }

    };

    const handleEditMenu = (menuItem) => {

        setSelectedMenu(menuItem);

        setIsEditMode(true);

        setOpenDialog(true);

    };

const filteredMenuItems = menuItems.filter((item) => {

    const matchesSearch =
        item.ItemName.toLowerCase().includes(
            searchText.toLowerCase()
        );

    const matchesCategory =
        selectedCategory === "all"
            ? true
            : item.CategoryId === selectedCategory;

    return matchesSearch && matchesCategory;

});
    return (

        <Box>

           <MenuToolbar
    searchText={searchText}
    setSearchText={setSearchText}

    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    categories={categories}

    onAddClick={() => {

        setSelectedMenu(null);
        setIsEditMode(false);
        setOpenDialog(true);

    }}
/>

            <MenuTable
                menuItems={filteredMenuItems}
                onEdit={handleEditMenu}
                loading={loading}
                onDelete={handleDeleteMenu}
            />

            <MenuDialog
                open={openDialog}
                onClose={() => {

                    setOpenDialog(false);

                    setSelectedMenu(null);

                    setIsEditMode(false);

                }}
                categories={categories}
                onSave={

                    isEditMode

                        ? handleUpdateMenu

                        : handleCreateMenu

                }
                selectedMenu={selectedMenu}
                isEditMode={isEditMode}
            />

        </Box>

    );

}

export default Menu;