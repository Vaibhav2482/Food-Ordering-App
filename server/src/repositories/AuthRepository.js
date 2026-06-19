import sql from "../config/db.js";

export const adminLogin = async (email, password) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Email", sql.NVarChar, email)
        .input("Password", sql.NVarChar, password)
        .execute("sp_AdminLogin");

    if (result.recordset.length === 0) {
        return {
            success: false,
            message: "Invalid Email or Password"
        };
    }

    return {
        success: true,
        message: "Login Successful",
        data: result.recordset[0]
    };
};