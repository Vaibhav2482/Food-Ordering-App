import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const adminLogin = async (email, password) => {

    const result = await pool.query(
        `SELECT A."AdminId", A."FullName", A."Email", A."Password", A."BranchId", B."BranchName"
         FROM "Admins" A
         LEFT JOIN "Branches" B ON A."BranchId" = B."BranchId"
         WHERE A."Email" = $1 AND A."IsActive" = TRUE`,
        [email]
    );

    const admin = result.rows[0];

    if (!admin) {
        return {
            success: false,
            message: "Invalid Email or Password"
        };
    }

    const passwordMatches = await bcrypt.compare(password, admin.Password);

    if (!passwordMatches) {
        return {
            success: false,
            message: "Invalid Email or Password"
        };
    }

    delete admin.Password;

    return {
        success: true,
        message: "Login Successful",
        data: admin
    };
};
