import bcrypt from "bcrypt";
import crypto from "crypto";
import * as CustomerRepository from "../repositories/CustomerRepository.js";

export const registerCustomer = async (customer) => {

    if (!customer.fullName || customer.fullName.trim() === "") {
        return {
            success: false,
            message: "Full Name is required."
        };
    }

    if (!customer.email || customer.email.trim() === "") {
        return {
            success: false,
            message: "Email is required."
        };
    }

    if (!customer.phone || customer.phone.trim() === "") {
        return {
            success: false,
            message: "Phone is required."
        };
    }

    if (!customer.password || customer.password.trim() === "") {
        return {
            success: false,
            message: "Password is required."
        };
    }

    const existingCustomer = await CustomerRepository.getCustomerByEmail(customer.email);

    if (existingCustomer) {
        return {
            success: false,
            message: "Email already registered."
        };
    }

    const hashedPassword = await bcrypt.hash(customer.password, 10);

    const createdCustomer = await CustomerRepository.createCustomer({
        ...customer,
        password: hashedPassword
    });

    delete createdCustomer.Password;

    return {
        success: true,
        message: "Customer registered successfully.",
        data: createdCustomer
    };

};


const GUEST_PHONE = "0000000000";

export const getOrCreateGuestCustomer = async () => {

    const existing = await CustomerRepository.getCustomerByPhone(GUEST_PHONE);

    if (existing) {
        delete existing.Password;
        return {
            success: true,
            message: "Guest customer ready.",
            data: existing
        };
    }

    const randomPassword = crypto.randomBytes(24).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const createdCustomer = await CustomerRepository.createCustomer({
        fullName: "Walk-in Guest",
        email: "guest@chaichakhna.local",
        phone: GUEST_PHONE,
        password: hashedPassword
    });

    delete createdCustomer.Password;

    return {
        success: true,
        message: "Guest customer ready.",
        data: createdCustomer
    };

};

export const findOrCreateWalkInCustomer = async (customer) => {

    if (!customer.phone || customer.phone.trim() === "") {
        return {
            success: false,
            message: "Phone is required."
        };
    }

    const existingCustomer = await CustomerRepository.getCustomerByPhone(customer.phone);

    if (existingCustomer) {
        delete existingCustomer.Password;
        return {
            success: true,
            message: "Existing customer found.",
            data: existingCustomer
        };
    }

    if (!customer.fullName || customer.fullName.trim() === "") {
        return {
            success: false,
            message: "Full Name is required for a new customer."
        };
    }

    const email = customer.email && customer.email.trim() !== ""
        ? customer.email.trim()
        : `walkin.${customer.phone.trim()}@chaichakhna.local`;

    const existingByEmail = await CustomerRepository.getCustomerByEmail(email);

    if (existingByEmail) {
        return {
            success: false,
            message: "A customer with this email already exists."
        };
    }

    const randomPassword = crypto.randomBytes(24).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const createdCustomer = await CustomerRepository.createCustomer({
        fullName: customer.fullName.trim(),
        email,
        phone: customer.phone.trim(),
        password: hashedPassword
    });

    delete createdCustomer.Password;

    return {
        success: true,
        message: "Walk-in customer created successfully.",
        data: createdCustomer
    };

};

export const customerLogin = async (email, password) => {

    if (!email || email.trim() === "") {
        return {
            success: false,
            message: "Email is required."
        };
    }

    if (!password || password.trim() === "") {
        return {
            success: false,
            message: "Password is required."
        };
    }

    const customer = await CustomerRepository.customerLogin(email);

    if (!customer) {
        return {
            success: false,
            message: "Invalid Email or Password."
        };
    }

    const passwordMatches = await bcrypt.compare(password, customer.Password);

    if (!passwordMatches) {
        return {
            success: false,
            message: "Invalid Email or Password."
        };
    }

    delete customer.Password;

    return {
        success: true,
        message: "Login successful.",
        data: customer
    };

};


export const getCustomerById = async (customerId) => {

    const customer = await CustomerRepository.getCustomerById(customerId);

    if (!customer) {
        return {
            success: false,
            message: "Customer not found."
        };
    }

    return {
        success: true,
        message: "Customer fetched successfully.",
        data: customer
    };

};

export const updateCustomer = async (customerId, customer) => {

    const existingCustomer = await CustomerRepository.getCustomerById(customerId);

    if (!existingCustomer) {
        return {
            success: false,
            message: "Customer not found."
        };
    }

    customer.customerId = Number(customerId);

    const updatedCustomer = await CustomerRepository.updateCustomer(customer);

    return {
        success: true,
        message: "Customer updated successfully.",
        data: updatedCustomer
    };

};

export const getAllCustomers = async () => {

    const customers =
        await CustomerRepository.getAllCustomers();

    return {
        success: true,
        message: "Customers fetched successfully.",
        data: customers
    };

};

export const deleteCustomer = async (customerId) => {

    const existingCustomer =
        await CustomerRepository.getCustomerById(customerId);

    if (!existingCustomer) {

        return {
            success: false,
            message: "Customer not found."
        };

    }

    await CustomerRepository.deleteCustomer(customerId);

    return {
        success: true,
        message: "Customer deleted successfully."
    };

};