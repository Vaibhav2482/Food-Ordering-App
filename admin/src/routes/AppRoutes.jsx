import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Category from "../pages/category/Category";
import Dashboard from "../components/dashboard/Dashboard";
import Menu from "../pages/menu/Menu";
import Orders from "../pages/orders/Orders";
import Customers from "../pages/customers/Customers";


function AppRoutes() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/menu"
                        element={<Menu />}
                    />

                    <Route
                        path="/category"
                        element={<Category />}
                    />

                    <Route
    path="/orders"
    element={<Orders />}
/>

<Route
    path="/customers"
    element={<Customers />}
/>

                </Routes>

            </MainLayout>

        </BrowserRouter>

    );

}

export default AppRoutes;