import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";
import { Navigate, useLocation } from "react-router-dom";
const TeacherRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || role !== "teacher") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to={"/forbidden"}
      ></Navigate>
    );
  }

  return children;
};

export default TeacherRoutes;
