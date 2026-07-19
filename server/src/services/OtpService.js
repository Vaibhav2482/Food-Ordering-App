import bcrypt from "bcrypt";
import crypto from "crypto";
import * as OtpRepository from "../repositories/OtpRepository.js";
import * as CustomerRepository from "../repositories/CustomerRepository.js";

const OTP_EXPIRY_MINUTES = 5;
const RESEND_COOLDOWN_SECONDS = 30;
const MAX_VERIFY_ATTEMPTS = 5;

// No SMS provider is configured yet (real SMS in India needs a paid
// provider + DLT registration). Until SMS_PROVIDER is set, the OTP is
// returned in the API response so the flow works end-to-end in demo mode.
const smsConfigured = () => Boolean(process.env.SMS_PROVIDER);

const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const sendOtp = async (phone) => {

    if (!phone || String(phone).trim() === "") {
        return {
            success: false,
            message: "Phone number is required."
        };
    }

    phone = String(phone).trim();

    if (!isValidPhone(phone)) {
        return {
            success: false,
            message: "Enter a valid 10-digit mobile number."
        };
    }

    const existing = await OtpRepository.getOtpByPhone(phone);

    if (existing && existing.AgeSeconds < RESEND_COOLDOWN_SECONDS) {
        return {
            success: false,
            message: `Please wait ${Math.ceil(RESEND_COOLDOWN_SECONDS - existing.AgeSeconds)}s before requesting another OTP.`
        };
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await OtpRepository.upsertOtp(phone, otpHash, OTP_EXPIRY_MINUTES);

    if (smsConfigured()) {
        // Placeholder: plug the real SMS provider call here when keys exist.
        return {
            success: true,
            message: "OTP sent to your mobile number.",
            data: { phone, expiresInMinutes: OTP_EXPIRY_MINUTES }
        };
    }

    return {
        success: true,
        message: "OTP generated (demo mode - SMS not configured).",
        data: { phone, expiresInMinutes: OTP_EXPIRY_MINUTES, devOtp: otp }
    };

};

export const verifyOtp = async (phone, otp) => {

    if (!phone || String(phone).trim() === "") {
        return {
            success: false,
            message: "Phone number is required."
        };
    }

    if (!otp || String(otp).trim() === "") {
        return {
            success: false,
            message: "OTP is required."
        };
    }

    phone = String(phone).trim();
    otp = String(otp).trim();

    const record = await OtpRepository.getOtpByPhone(phone);

    if (!record) {
        return {
            success: false,
            message: "No OTP requested for this number. Please request one first."
        };
    }

    if (record.IsExpired) {
        await OtpRepository.deleteOtpByPhone(phone);
        return {
            success: false,
            message: "OTP has expired. Please request a new one."
        };
    }

    if (record.Attempts >= MAX_VERIFY_ATTEMPTS) {
        await OtpRepository.deleteOtpByPhone(phone);
        return {
            success: false,
            message: "Too many wrong attempts. Please request a new OTP."
        };
    }

    const matches = await bcrypt.compare(otp, record.OtpHash);

    if (!matches) {
        await OtpRepository.incrementAttempts(record.OtpId);
        return {
            success: false,
            message: "Incorrect OTP. Please try again."
        };
    }

    await OtpRepository.deleteOtpByPhone(phone);

    let customer = await CustomerRepository.getCustomerByPhone(phone);
    let isNewCustomer = false;

    if (!customer) {

        const randomPassword = crypto.randomBytes(24).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        customer = await CustomerRepository.createCustomer({
            fullName: "Customer",
            email: `otp.${phone}@chaichakhna.local`,
            phone,
            password: hashedPassword
        });

        isNewCustomer = true;

    }

    if (!customer.IsActive) {
        return {
            success: false,
            message: "This account has been deactivated."
        };
    }

    delete customer.Password;

    return {
        success: true,
        message: "Login successful.",
        data: { ...customer, isNewCustomer }
    };

};
