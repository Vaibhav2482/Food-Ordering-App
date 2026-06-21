import * as CustomerAddressRepository from "../repositories/CustomerAddressRepository.js";
import * as CustomerRepository from "../repositories/CustomerRepository.js";

export const createCustomerAddress = async (address) => {

    if (!address.customerId) {
        return {
            success: false,
            message: "Customer Id is required."
        };
    }

    if (!address.addressTitle || address.addressTitle.trim() === "") {
        return {
            success: false,
            message: "Address Title is required."
        };
    }

    if (!address.fullAddress || address.fullAddress.trim() === "") {
        return {
            success: false,
            message: "Full Address is required."
        };
    }

    if (!address.city || address.city.trim() === "") {
        return {
            success: false,
            message: "City is required."
        };
    }

    if (!address.state || address.state.trim() === "") {
        return {
            success: false,
            message: "State is required."
        };
    }

    if (!address.pincode || address.pincode.trim() === "") {
        return {
            success: false,
            message: "Pincode is required."
        };
    }

    const customer = await CustomerRepository.getCustomerById(address.customerId);

    if (!customer) {
        return {
            success: false,
            message: "Customer not found."
        };
    }

    const createdAddress =
        await CustomerAddressRepository.createCustomerAddress(address);

    return {
        success: true,
        message: "Customer Address created successfully.",
        data: createdAddress
    };

};