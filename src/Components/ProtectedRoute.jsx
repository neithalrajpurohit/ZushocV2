import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
