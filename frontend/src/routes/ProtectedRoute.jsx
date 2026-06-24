import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  console.log("ProtectedRoute Auth:", auth);

  if (!auth.isAuthenticated) {
    console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;