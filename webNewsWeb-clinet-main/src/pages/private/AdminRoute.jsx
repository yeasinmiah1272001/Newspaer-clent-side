import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import { useAdmin } from "../../hooks/api";
const AdminRoute = ({ children }) => {
  const { isLoading, data } = useAdmin();

  if (isLoading && data === undefined) return <LoadingAnimation />;

  if (data?.roll === "admin") {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
