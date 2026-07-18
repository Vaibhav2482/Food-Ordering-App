import { Navigate } from "react-router-dom";

function getStoredAdmin() {

    try {
        return JSON.parse(localStorage.getItem("admin"));
    } catch {
        localStorage.removeItem("admin");
        return null;
    }

}

function ProtectedRoute({ children }) {

    const admin = getStoredAdmin();

    if (!admin || !admin.AdminId || !admin.Email || !admin.token) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

export default ProtectedRoute;
