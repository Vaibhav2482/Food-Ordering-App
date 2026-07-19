import pool from "../config/db.js";

export const upsertOtp = async (phone, otpHash, expiryMinutes) => {

    const result = await pool.query(
        `INSERT INTO "OtpCodes" ("Phone", "OtpHash", "ExpiresAt")
         VALUES ($1, $2, (now() AT TIME ZONE 'utc') + make_interval(mins => $3))
         ON CONFLICT ("Phone")
         DO UPDATE SET "OtpHash" = $2,
                       "ExpiresAt" = (now() AT TIME ZONE 'utc') + make_interval(mins => $3),
                       "Attempts" = 0,
                       "CreatedAt" = NOW()
         RETURNING *`,
        [phone, otpHash, expiryMinutes]
    );

    return result.rows[0];

};

export const getOtpByPhone = async (phone) => {

    // Age/expiry computed in SQL against the same clock that wrote the
    // naive timestamps, so results don't depend on the Node process TZ.
    const result = await pool.query(
        `SELECT *,
                EXTRACT(EPOCH FROM ((now() AT TIME ZONE 'utc') - "CreatedAt")) AS "AgeSeconds",
                ("ExpiresAt" < (now() AT TIME ZONE 'utc')) AS "IsExpired"
         FROM "OtpCodes" WHERE "Phone" = $1`,
        [phone]
    );

    return result.rows[0];

};

export const incrementAttempts = async (otpId) => {

    const result = await pool.query(
        `UPDATE "OtpCodes" SET "Attempts" = "Attempts" + 1 WHERE "OtpId" = $1 RETURNING "Attempts"`,
        [otpId]
    );

    return result.rows[0]?.Attempts;

};

export const deleteOtpByPhone = async (phone) => {

    await pool.query(`DELETE FROM "OtpCodes" WHERE "Phone" = $1`, [phone]);

};
