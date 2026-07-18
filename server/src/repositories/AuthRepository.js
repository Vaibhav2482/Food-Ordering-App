import bcrypt from "bcrypt";
import sql from "../config/db.js";

export const adminLogin = async (email, password) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Email", sql.NVarChar, email)
        .execute("sp_AdminLogin");

    const admin = result.recordset[0];

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