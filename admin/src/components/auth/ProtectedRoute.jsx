import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const admin = JSON.parse(

        localStorage.getItem("admin")

    );

    if (

        !admin ||

        !admin.AdminId ||

        !admin.Email

    ) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default ProtectedRoute;