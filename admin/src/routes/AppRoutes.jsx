import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../components/dashboard/Dashboard";
import Menu from "../pages/menu/Menu";

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

                </Routes>

            </MainLayout>

        </BrowserRouter>

    );

}

export default AppRoutes;