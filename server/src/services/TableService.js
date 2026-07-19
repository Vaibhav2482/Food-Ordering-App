import * as TableRepository from "../repositories/TableRepository.js";

export const getActiveTables = async (branchId) => {

    if (!branchId) {
        return {
            success: false,
            message: "Branch Id is required."
        };
    }

    const tables = await TableRepository.getActiveTables(branchId);

    return {
        success: true,
        message: "Tables fetched successfully.",
        data: tables
    };

};

export const getAllTables = async (branchId) => {

    const tables = await TableRepository.getAllTables(branchId);

    return {
        success: true,
        message: "Tables fetched successfully.",
        data: tables
    };

};

export const getTableById = async (tableId) => {

    const table = await TableRepository.getTableById(tableId);

    if (!table) {
        return {
            success: false,
            message: "Table not found."
        };
    }

    return {
        success: true,
        message: "Table fetched successfully.",
        data: table
    };

};

export const createTable = async (table) => {

    if (!table.branchId) {
        return {
            success: false,
            message: "Branch Id is required."
        };
    }

    if (!table.tableName || table.tableName.trim() === "") {
        return {
            success: false,
            message: "Table Name is required."
        };
    }

    const duplicate = await TableRepository.getTableByName(table.branchId, table.tableName);

    if (duplicate) {
        return {
            success: false,
            message: duplicate.IsActive
                ? `A table named "${duplicate.TableName}" already exists in this branch.`
                : `A deactivated table named "${duplicate.TableName}" already exists in this branch — reactivate it instead.`
        };
    }

    const createdTable = await TableRepository.createTable(table);

    return {
        success: true,
        message: "Table created successfully.",
        data: createdTable
    };

};

export const updateTable = async (tableId, table) => {

    const existingTable = await TableRepository.getTableById(tableId);

    if (!existingTable) {
        return {
            success: false,
            message: "Table not found."
        };
    }

    if (!table.tableName || table.tableName.trim() === "") {
        return {
            success: false,
            message: "Table Name is required."
        };
    }

    const duplicate = await TableRepository.getTableByName(
        existingTable.BranchId,
        table.tableName,
        Number(tableId)
    );

    if (duplicate) {
        return {
            success: false,
            message: `A table named "${duplicate.TableName}" already exists in this branch.`
        };
    }

    const updatedTable = await TableRepository.updateTable({
        ...table,
        tableId: Number(tableId)
    });

    return {
        success: true,
        message: "Table updated successfully.",
        data: updatedTable
    };

};

export const deactivateTable = async (tableId) => {

    const existingTable = await TableRepository.getTableById(tableId);

    if (!existingTable) {
        return {
            success: false,
            message: "Table not found."
        };
    }

    await TableRepository.deactivateTable(tableId);

    return {
        success: true,
        message: "Table deactivated successfully."
    };

};
