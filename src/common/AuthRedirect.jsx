// src/components/AuthRedirect.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import { lookInSession } from "../common/session";

const AuthRedirect = ({ children }) => {
  const { userAuth } = useContext(UserContext);
  const sessionUser = lookInSession("user");

  if (userAuth?.access_token || sessionUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
