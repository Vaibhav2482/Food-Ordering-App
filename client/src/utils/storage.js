const AUTH_KEY = "cc_customer_auth";
const GUEST_CART_KEY = "cc_guest_cart";
const BRANCH_KEY = "cc_selected_branch_id";

export const getStoredAuth = () => {

    try {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    } catch {
        localStorage.removeItem(AUTH_KEY);
        return null;
    }

};

export const setStoredAuth = (auth) => {

    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));

};

export const clearStoredAuth = () => {

    localStorage.removeItem(AUTH_KEY);

};

export const getGuestCart = () => {

    try {
        return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
    } catch {
        localStorage.removeItem(GUEST_CART_KEY);
        return [];
    }

};

export const setGuestCart = (items) => {

    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

};

export const clearGuestCart = () => {

    localStorage.removeItem(GUEST_CART_KEY);

};

export const getStoredBranchId = () => {

    try {
        return JSON.parse(localStorage.getItem(BRANCH_KEY));
    } catch {
        localStorage.removeItem(BRANCH_KEY);
        return null;
    }

};

export const setStoredBranchId = (branchId) => {

    localStorage.setItem(BRANCH_KEY, JSON.stringify(branchId));

};
