import * as CategoryRepository from "../repositories/CategoryRepository.js";

// Get All Categories
export const getAllCategories = async () => {

    const categories = await CategoryRepository.getAllCategories();

    return {
        success: true,
        message: "Categories fetched successfully.",
        data: categories
    };
};

// Get Category By Id
export const getCategoryById = async (categoryId) => {

    const category = await CategoryRepository.getCategoryById(categoryId);

    if (category.length === 0) {
        return {
            success: false,
            message: "Category not found."
        };
    }

    return {
        success: true,
        message: "Category fetched successfully.",
        data: category[0]
    };
};

// Create Category
export const createCategory = async (category) => {

    category.categoryName = category.categoryName?.trim();
    category.description = category.description?.trim();

    if (!category.categoryName) {
        return {
            success: false,
            message: "Category Name is required."
        };
    }

    if (!category.displayOrder || category.displayOrder <= 0) {
        return {
            success: false,
            message: "Display Order must be greater than 0."
        };
    }

    const existingCategory = await CategoryRepository.checkCategoryExists(
        category.categoryName
    );

    if (existingCategory.length > 0) {
        return {
            success: false,
            message: "Category already exists."
        };
    }

    const result = await CategoryRepository.createCategory(category);

    return {
        success: true,
        message: "Category created successfully.",
        data: result
    };
};

// Update Category
export const updateCategory = async (categoryId, category) => {

    category.categoryId = Number(categoryId);
    category.categoryName = category.categoryName?.trim();
    category.description = category.description?.trim();

    if (!category.categoryName) {
        return {
            success: false,
            message: "Category Name is required."
        };
    }

    if (!category.displayOrder || category.displayOrder <= 0) {
        return {
            success: false,
            message: "Display Order must be greater than 0."
        };
    }

    const existingCategory = await CategoryRepository.getCategoryById(categoryId);

    if (existingCategory.length === 0) {
        return {
            success: false,
            message: "Category not found."
        };
    }

    const duplicateCategory =
        await CategoryRepository.checkCategoryExistsForUpdate(
            categoryId,
            category.categoryName
        );

    if (duplicateCategory.length > 0) {
        return {
            success: false,
            message: "Category already exists."
        };
    }

    if (category.isActive === undefined) {
        category.isActive = true;
    }

    await CategoryRepository.updateCategory(category);

    return {
        success: true,
        message: "Category updated successfully."
    };
};

export const deleteCategory = async (categoryId) => {

    const category = await CategoryRepository.getCategoryById(categoryId);

    if (category.length === 0) {
        return {
            success: false,
            message: "Category not found."
        };
    }

    await CategoryRepository.deleteCategory(categoryId);

    return {
        success: true,
        message: "Category deleted successfully."
    };
};