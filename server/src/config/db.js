import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool, types } = pg;

// node-postgres returns NUMERIC/DECIMAL as strings by default (safe for
// arbitrary precision), but every price/total field in this app (Price,
// SubTotal, TotalAmount, etc.) is passed straight through to the two React
// frontends as a plain number, matching what mssql returned. Parse them as
// floats here instead of hunting down every call site.
types.setTypeParser(1700, (value) => (value === null ? null : parseFloat(value)));

// Same reasoning for BIGINT (COUNT(*) results, OID 20) — node-postgres
// returns these as strings to avoid precision loss beyond
// Number.MAX_SAFE_INTEGER, which this app's order/customer counts will
// never approach. mssql returned these as plain numbers.
types.setTypeParser(20, (value) => (value === null ? null : parseInt(value, 10)));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        client.release();
        console.log("✅ PostgreSQL Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default pool;
