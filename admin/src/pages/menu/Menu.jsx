import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuToolbar from "./MenuToolbar";
import MenuTable from "./MenuTable";
import MenuDialog from "./MenuDialog";
import {
    getAllMenu,
    createMenu,
    updateMenu
} from "../../services/menuService";
import { getAllCategories } from "../../services/categoryService";
import { getAllBranches } from "../../services/branchService";
import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function Menu() {

    const admin = getStoredAdmin();
    const ownerMode = isOwner(admin);

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [branches, setBranches] = useState(
        ownerMode ? [] : [{ BranchId: admin.BranchId, BranchName: admin.BranchName }]
    );
    const [selectedBranchId, setSelectedBranchId] = useState(ownerMode ? null : admin.BranchId);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadCategories();

        if (ownerMode) {
            loadBranches();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (selectedBranchId) {
            loadMenu(selectedBranchId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBranchId]);

    const loadBranches = async () => {

        try {

            const response = await getAllBranches();

            if (response.success) {

                setBranches(response.data);

                if (response.data.length > 0) {
                    setSelectedBranchId(response.data[0].BranchId);
                }

            }

        } catch (error) {

            toast.error("Failed to load branches.");

        }

    };

    const loadMenu = async (branchId) => {

        try {

            setLoading(true);
            const response = await getAllMenu(branchId);

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

            if (response.success) {

                setCategories(response.data);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleCreateMenu = async (menuItem) => {

        try {

            const response = await createMenu({ ...menuItem, branchId: selectedBranchId });

            if (response.success) {

                await loadMenu(selectedBranchId);
                toast.success("Menu item created successfully.");
                setOpenDialog(false);

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleUpdateMenu = async (menuItem) => {

        try {

            const response = await updateMenu(

                selectedMenu.MenuItemId,

                menuItem

            );

            if (response.success) {

                await loadMenu(selectedBranchId);
                toast.success("Menu item updated successfully.");
                setOpenDialog(false);

                setSelectedMenu(null);

                setIsEditMode(false);

            } else {

                toast.error(response.message);

            }

        }
        catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleToggleAvailable = async (menuItem) => {

        try {

            const response = await updateMenu(menuItem.MenuItemId, {

                categoryId: menuItem.CategoryId,
                itemName: menuItem.ItemName,
                description: menuItem.Description,
                price: menuItem.Price,
                isAvailable: !menuItem.IsAvailable,
                isPopular: menuItem.IsPopular,
                isActive: menuItem.IsActive

            });

            if (response.success) {

                await loadMenu(selectedBranchId);

                toast.success(
                    menuItem.IsAvailable
                        ? "Marked as sold out / unavailable."
                        : "Marked as available."
                );

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleToggleActive = async (menuItem) => {

        try {

            const response = await updateMenu(menuItem.MenuItemId, {

                categoryId: menuItem.CategoryId,
                itemName: menuItem.ItemName,
                description: menuItem.Description,
                price: menuItem.Price,
                isAvailable: menuItem.IsAvailable,
                isPopular: menuItem.IsPopular,
                isActive: !menuItem.IsActive

            });

            if (response.success) {

                await loadMenu(selectedBranchId);

                toast.success(
                    menuItem.IsActive
                        ? "Item hidden from customers."
                        : "Item is now visible to customers."
                );

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

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

    branches={branches}
    selectedBranchId={selectedBranchId}
    setSelectedBranchId={setSelectedBranchId}
    ownerMode={ownerMode}

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
                onToggleAvailable={handleToggleAvailable}
                onToggleActive={handleToggleActive}
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
