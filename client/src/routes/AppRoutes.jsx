import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Checkout from "../pages/checkout/Checkout";
import OrderConfirmation from "../pages/order-confirmation/OrderConfirmation";
import OrderHistory from "../pages/orders/OrderHistory";
import OrderDetail from "../pages/orders/OrderDetail";
import OrderBill from "../pages/orders/OrderBill";
import Profile from "../pages/profile/Profile";
import Help from "../pages/help/Help";
import HelpTopic from "../pages/help/HelpTopic";
import NotFound from "../pages/not-found/NotFound";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Home />} />

                    <Route path="menu" element={<Menu />} />

                    <Route path="cart" element={<Cart />} />

                    <Route path="login" element={<Login />} />

                    <Route path="register" element={<Register />} />

                    <Route
                        path="checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="order-confirmation/:orderId"
                        element={
                            <ProtectedRoute>
                                <OrderConfirmation />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="orders"
                        element={
                            <ProtectedRoute>
                                <OrderHistory />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="orders/:id"
                        element={
                            <ProtectedRoute>
                                <OrderDetail />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="orders/:id/bill"
                        element={
                            <ProtectedRoute>
                                <OrderBill />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="help" element={<Help />} />

                    <Route path="help/:slug" element={<HelpTopic />} />

                    <Route path="*" element={<NotFound />} />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;
