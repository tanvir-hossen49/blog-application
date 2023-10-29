import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const status = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const location = useLocation();

  if (!status || !userData.labels.includes('admin')) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  if (status && userData.labels.includes('admin')) {
    return children;
  }
};

export default AdminRoute;
