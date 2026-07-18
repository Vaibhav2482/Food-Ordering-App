import * as BranchRepository from "../repositories/BranchRepository.js";

export const getActiveBranches = async () => {

    const branches = await BranchRepository.getActiveBranches();

    return {
        success: true,
        message: "Branches fetched successfully.",
        data: branches
    };

};

export const getAllBranches = async () => {

    const branches = await BranchRepository.getAllBranches();

    return {
        success: true,
        message: "Branches fetched successfully.",
        data: branches
    };

};

export const getBranchById = async (branchId) => {

    const branch = await BranchRepository.getBranchById(branchId);

    if (!branch) {
        return {
            success: false,
            message: "Branch not found."
        };
    }

    return {
        success: true,
        message: "Branch fetched successfully.",
        data: branch
    };

};

export const createBranch = async (branch) => {

    if (!branch.branchName || branch.branchName.trim() === "") {
        return {
            success: false,
            message: "Branch Name is required."
        };
    }

    const createdBranch = await BranchRepository.createBranch(branch);

    return {
        success: true,
        message: "Branch created successfully.",
        data: createdBranch
    };

};

export const updateBranch = async (branchId, branch) => {

    const existingBranch = await BranchRepository.getBranchById(branchId);

    if (!existingBranch) {
        return {
            success: false,
            message: "Branch not found."
        };
    }

    if (!branch.branchName || branch.branchName.trim() === "") {
        return {
            success: false,
            message: "Branch Name is required."
        };
    }

    const updatedBranch = await BranchRepository.updateBranch({
        ...branch,
        branchId: Number(branchId)
    });

    return {
        success: true,
        message: "Branch updated successfully.",
        data: updatedBranch
    };

};

export const deactivateBranch = async (branchId) => {

    const existingBranch = await BranchRepository.getBranchById(branchId);

    if (!existingBranch) {
        return {
            success: false,
            message: "Branch not found."
        };
    }

    await BranchRepository.deactivateBranch(branchId);

    return {
        success: true,
        message: "Branch deactivated successfully."
    };

};
