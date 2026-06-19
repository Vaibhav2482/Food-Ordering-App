import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate:
            process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
    },
};

export const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("✅ SQL Server Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default sql;