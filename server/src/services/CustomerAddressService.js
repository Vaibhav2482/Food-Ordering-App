import * as CustomerAddressRepository from "../repositories/CustomerAddressRepository.js";
import * as CustomerRepository from "../repositories/CustomerRepository.js";

const validateAddressFields = (address) => {

    if (!address.addressTitle || address.addressTitle.trim() === "") {
        return "Address Title is required.";
    }

    if (!address.fullAddress || address.fullAddress.trim() === "") {
        return "Full Address is required.";
    }

    if (!address.city || address.city.trim() === "") {
        return "City is required.";
    }

    if (!address.state || address.state.trim() === "") {
        return "State is required.";
    }

    if (!address.pincode || address.pincode.trim() === "") {
        return "Pincode is required.";
    }

    return null;

};

export const createCustomerAddress = async (address) => {

    if (!address.customerId) {
        return {
            success: false,
            message: "Customer Id is required."
        };
    }

    const validationError = validateAddressFields(address);

    if (validationError) {
        return {
            success: false,
            message: validationError
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

export const getCustomerAddresses = async (customerId) => {

    const addresses = await CustomerAddressRepository.getCustomerAddresses(customerId);

    return {
        success: true,
        message: "Customer addresses fetched successfully.",
        data: addresses
    };

};

export const updateCustomerAddress = async (addressId, address) => {

    const existingAddress = await CustomerAddressRepository.getCustomerAddressById(addressId);

    if (!existingAddress) {
        return {
            success: false,
            message: "Address not found."
        };
    }

    const validationError = validateAddressFields(address);

    if (validationError) {
        return {
            success: false,
            message: validationError
        };
    }

    address.addressId = Number(addressId);

    const updatedAddress = await CustomerAddressRepository.updateCustomerAddress(address);

    return {
        success: true,
        message: "Customer address updated successfully.",
        data: updatedAddress
    };

};

export const deleteCustomerAddress = async (addressId) => {

    const existingAddress = await CustomerAddressRepository.getCustomerAddressById(addressId);

    if (!existingAddress) {
        return {
            success: false,
            message: "Address not found."
        };
    }

    await CustomerAddressRepository.deleteCustomerAddress(addressId);

    return {
        success: true,
        message: "Customer address deleted successfully."
    };

};

export const getCustomerAddressById = async (addressId) => {

    return await CustomerAddressRepository.getCustomerAddressById(addressId);

};
