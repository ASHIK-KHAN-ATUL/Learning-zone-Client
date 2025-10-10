import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivetRoutes;
