// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Pages/Login/login";
import Layout from "./components/Layout/layout";

const ProtectedRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated, "Sdfsdfdsfdsf sfsdf");
  // Redirect to login page if not authenticated
  // if (!isAuthenticated) {
  //   return <Login />;
  // }

  // Render children components if authenticated
  return <Layout />;
};

export default ProtectedRoute;
