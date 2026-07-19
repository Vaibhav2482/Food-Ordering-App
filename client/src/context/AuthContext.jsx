import { createContext, useContext, useEffect, useState } from "react";
import { getStoredAuth, setStoredAuth, clearStoredAuth } from "../utils/storage";
import { loginCustomer, registerCustomer, verifyOtp } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(() => getStoredAuth());

    useEffect(() => {

        if (auth) {
            setStoredAuth(auth);
        } else {
            clearStoredAuth();
        }

    }, [auth]);

    const login = async (email, password) => {

        const response = await loginCustomer({ email, password });

        if (!response.success) {
            return response;
        }

        const { token, ...customer } = response.data;

        setAuth({ token, customer });

        return response;

    };

    const loginWithOtp = async (phone, otp) => {

        const response = await verifyOtp(phone, otp);

        if (!response.success) {
            return response;
        }

        const { token, ...customer } = response.data;

        setAuth({ token, customer });

        return response;

    };

    const register = async (fullName, email, phone, password) => {

        return await registerCustomer({ fullName, email, phone, password });

    };

    const logout = () => {

        setAuth(null);

    };

    const value = {
        customer: auth?.customer || null,
        token: auth?.token || null,
        isAuthenticated: Boolean(auth?.token),
        login,
        loginWithOtp,
        register,
        logout,
        setAuth
    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}
