import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onRequireLogin }) => {
  const token = localStorage.getItem("token");

  // If user is NOT logged in
  if (!token) {
    if (onRequireLogin) onRequireLogin();
    return <Navigate to="/" replace />;
  }

  // If logged in → allow page
  return children;
};

export default ProtectedRoute;
