import bcrypt from "bcrypt";
import * as AdminRepository from "../repositories/AdminRepository.js";

export const getAllAdmins = async () => {

    const admins = await AdminRepository.getAllAdmins();

    return {
        success: true,
        message: "Admins fetched successfully.",
        data: admins
    };

};

export const getAdminById = async (adminId) => {

    const admin = await AdminRepository.getAdminById(adminId);

    if (!admin) {
        return {
            success: false,
            message: "Admin not found."
        };
    }

    return {
        success: true,
        message: "Admin fetched successfully.",
        data: admin
    };

};

export const createAdmin = async (admin) => {

    if (!admin.fullName || admin.fullName.trim() === "") {
        return {
            success: false,
            message: "Full Name is required."
        };
    }

    if (!admin.email || admin.email.trim() === "") {
        return {
            success: false,
            message: "Email is required."
        };
    }

    if (!admin.password || admin.password.trim() === "") {
        return {
            success: false,
            message: "Password is required."
        };
    }

    const existingAdmin = await AdminRepository.getAdminByEmail(admin.email);

    if (existingAdmin) {
        return {
            success: false,
            message: "Email already registered."
        };
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const createdAdmin = await AdminRepository.createAdmin({
        ...admin,
        password: hashedPassword
    });

    return {
        success: true,
        message: "Admin created successfully.",
        data: createdAdmin
    };

};

export const updateAdmin = async (adminId, admin, requestingAdminId) => {

    const existingAdmin = await AdminRepository.getAdminById(adminId);

    if (!existingAdmin) {
        return {
            success: false,
            message: "Admin not found."
        };
    }

    if (!admin.fullName || admin.fullName.trim() === "") {
        return {
            success: false,
            message: "Full Name is required."
        };
    }

    if (
        String(adminId) === String(requestingAdminId) &&
        admin.isActive === false
    ) {
        return {
            success: false,
            message: "You cannot deactivate your own account."
        };
    }

    if (
        String(adminId) === String(requestingAdminId) &&
        !existingAdmin.BranchId &&
        admin.branchId
    ) {
        return {
            success: false,
            message: "You cannot remove your own Owner access."
        };
    }

    const updatedAdmin = await AdminRepository.updateAdmin({
        ...admin,
        adminId: Number(adminId)
    });

    return {
        success: true,
        message: "Admin updated successfully.",
        data: updatedAdmin
    };

};

export const deactivateAdmin = async (adminId, requestingAdminId) => {

    if (String(adminId) === String(requestingAdminId)) {
        return {
            success: false,
            message: "You cannot deactivate your own account."
        };
    }

    const existingAdmin = await AdminRepository.getAdminById(adminId);

    if (!existingAdmin) {
        return {
            success: false,
            message: "Admin not found."
        };
    }

    await AdminRepository.deactivateAdmin(adminId);

    return {
        success: true,
        message: "Admin deactivated successfully."
    };

};
