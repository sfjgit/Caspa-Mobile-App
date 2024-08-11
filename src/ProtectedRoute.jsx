// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "./components/Layout/layout";

const ProtectedRoute = () => {
  const cookie = new Cookies();
  // Check if the user is authenticated by checking the token in localStorage
  const isAuthenticated = Boolean(cookie.get("token"));

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout />;
};

export default ProtectedRoute;
