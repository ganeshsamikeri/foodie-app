// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onRequireLogin }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    if (onRequireLogin) onRequireLogin();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
