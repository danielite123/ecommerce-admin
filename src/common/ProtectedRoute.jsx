import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import { lookInSession } from "../common/session";

const ProtectedRoute = () => {
  const { userAuth } = useContext(UserContext);
  const location = useLocation();
  const sessionUser = lookInSession("user");

  const isAuthenticated = !!userAuth?.access_token || !!sessionUser;
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
