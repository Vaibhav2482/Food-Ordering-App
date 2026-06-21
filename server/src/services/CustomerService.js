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

    const createdCustomer = await CustomerRepository.createCustomer(customer);

    return {
        success: true,
        message: "Customer registered successfully.",
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

    const customer = await CustomerRepository.customerLogin(email, password);

    if (!customer) {
        return {
            success: false,
            message: "Invalid Email or Password."
        };
    }

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