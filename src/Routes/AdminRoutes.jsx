import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to={"/forbidden"}
        replace
      ></Navigate>
    );
  }

  return children;
};

export default AdminRoutes;
