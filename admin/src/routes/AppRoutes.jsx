import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

import Login from "../pages/login/Login";

import Dashboard from "../components/dashboard/Dashboard";
import Branches from "../pages/branches/Branches";
import Admins from "../pages/admins/Admins";
import Tables from "../pages/tables/Tables";
import Category from "../pages/category/Category";
import Menu from "../pages/menu/Menu";
import Orders from "../pages/orders/Orders";
import DineIn from "../pages/dinein/DineIn";
import OrderBill from "../pages/orders/OrderBill";
import Customers from "../pages/customers/Customers";
import Reports from "../pages/reports/Reports";

function isAuthenticated() {

    try {
        const admin = JSON.parse(localStorage.getItem("admin"));
        return Boolean(admin?.AdminId && admin?.token);
    } catch {
        return false;
    }

}

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>

                            <MainLayout />

                        </ProtectedRoute>
                    }
                >

                    <Route
                        index
                        element={
                            <Navigate
                                to="/orders"
                                replace
                            />
                        }
                    />

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="branches"
                        element={<Branches />}
                    />

                    <Route
                        path="admins"
                        element={<Admins />}
                    />

                    <Route
                        path="tables"
                        element={<Tables />}
                    />

                    <Route
                        path="category"
                        element={<Category />}
                    />

                    <Route
                        path="menu"
                        element={<Menu />}
                    />

                    <Route
                        path="orders"
                        element={<Orders />}
                    />

                    <Route
                        path="dine-in"
                        element={<DineIn />}
                    />

                    <Route
                        path="orders/:id/bill"
                        element={<OrderBill />}
                    />

                    <Route
                        path="customers"
                        element={<Customers />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={isAuthenticated() ? "/orders" : "/login"}
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;