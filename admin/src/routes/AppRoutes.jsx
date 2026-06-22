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
import Category from "../pages/category/Category";
import Menu from "../pages/menu/Menu";
import Orders from "../pages/orders/Orders";
import Customers from "../pages/customers/Customers";
import Reports from "../pages/reports/Reports";

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
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
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
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;