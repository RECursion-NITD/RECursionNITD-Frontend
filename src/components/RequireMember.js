import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";

const RequireMember = () => {
  const { user } = useAuth();
  const role = user?.role;
  const location = useLocation();
  return role <= ROLES.MODERATOR ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default RequireMember;
