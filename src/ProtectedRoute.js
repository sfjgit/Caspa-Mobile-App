// import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

const ProtectedRoute = () => {
  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return <Layout />;
};

export default ProtectedRoute;
