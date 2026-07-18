import * as MenuRepository from "../repositories/MenuRepository.js";

export const getAllMenuItems = async (branchId) => {

    if (!branchId) {
        return {
            success: false,
            message: "Branch Id is required."
        };
    }

    const menuItems = await MenuRepository.getAllMenuItems(branchId);

    return {
        success: true,
        message: "Menu items fetched successfully.",
        data: menuItems
    };
};


export const getMenuItemById = async (menuItemId) => {

    const menuItem = await MenuRepository.getMenuItemById(menuItemId);

    if (menuItem.length === 0) {
        return {
            success: false,
            message: "Menu item not found."
        };
    }

    return {
        success: true,
        message: "Menu item fetched successfully.",
        data: menuItem[0]
    };
};

// Create Menu Item
export const createMenuItem = async (menuItem) => {

    menuItem.itemName = menuItem.itemName?.trim();
    menuItem.description = menuItem.description?.trim();

    if (!menuItem.branchId) {
        return {
            success: false,
            message: "Branch is required."
        };
    }

    if (!menuItem.categoryId) {
        return {
            success: false,
            message: "Category is required."
        };
    }

    if (!menuItem.itemName) {
        return {
            success: false,
            message: "Item Name is required."
        };
    }

    if (!menuItem.price || menuItem.price <= 0) {
        return {
            success: false,
            message: "Price must be greater than 0."
        };
    }

    const duplicate = await MenuRepository.checkMenuItemExists(
        menuItem.itemName,
        menuItem.branchId
    );

    if (duplicate.length > 0) {
        return {
            success: false,
            message: "Menu item already exists for this branch."
        };
    }

    if (menuItem.isAvailable === undefined) {
        menuItem.isAvailable = true;
    }

    if (menuItem.isPopular === undefined) {
        menuItem.isPopular = false;
    }

    if (menuItem.isActive === undefined) {
        menuItem.isActive = true;
    }

    const result = await MenuRepository.createMenuItem(menuItem);

    return {
        success: true,
        message: "Menu item created successfully.",
        data: result
    };
};

export const updateMenuItem = async (menuItemId, menuItem) => {

    const existingMenuItem = await MenuRepository.getMenuItemById(menuItemId);

    if (existingMenuItem.length === 0) {
        return {
            success: false,
            message: "Menu item not found."
        };
    }

    menuItem.itemName = menuItem.itemName?.trim();
    menuItem.description = menuItem.description?.trim();

    if (!menuItem.categoryId) {
        return {
            success: false,
            message: "Category is required."
        };
    }

    if (!menuItem.itemName) {
        return {
            success: false,
            message: "Item Name is required."
        };
    }

    if (!menuItem.price || menuItem.price <= 0) {
        return {
            success: false,
            message: "Price must be greater than 0."
        };
    }

    // A menu item's branch is fixed at creation time; duplicate-name checks stay scoped to it.
    const branchId = existingMenuItem[0].BranchId;

    const duplicateMenuItem = await MenuRepository.getMenuItemByName(menuItem.itemName, branchId);

    if (
        duplicateMenuItem &&
        duplicateMenuItem.MenuItemId !== Number(menuItemId)
    ) {
        return {
            success: false,
            message: "Menu item already exists for this branch."
        };
    }

    if (menuItem.isAvailable === undefined) {
        menuItem.isAvailable = existingMenuItem[0].IsAvailable;
    }

    if (menuItem.isPopular === undefined) {
        menuItem.isPopular = existingMenuItem[0].IsPopular;
    }

    if (menuItem.isActive === undefined) {
        menuItem.isActive = existingMenuItem[0].IsActive;
    }

    menuItem.menuItemId = Number(menuItemId);

    const updatedMenuItem = await MenuRepository.updateMenuItem(menuItem);

    return {
        success: true,
        message: "Menu item updated successfully.",
        data: updatedMenuItem
    };
};


export const deleteMenuItem = async (menuItemId) => {

    const existingMenuItem = await MenuRepository.getMenuItemById(menuItemId);

    if (existingMenuItem.length === 0) {
        return {
            success: false,
            message: "Menu item not found."
        };
    }

    await MenuRepository.deleteMenuItem(menuItemId);

    return {
        success: true,
        message: "Menu item deleted successfully."
    };
};
