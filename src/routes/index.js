import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { TokenProvider } from "../context/TokenContext";

// Authentication related pages
import Login from "../pages/Login/Index";
import Register from "../pages/Register/Index";
import Home from "../pages/Dashboard/Index";

import Pages401 from "../pages/Page404";

const authProtectedRoutes = [
  {
    path: "/login",
    component: Home,
  },

  { path: "/", exact: true, component: () => <Navigate to="/login" /> },
];

const publicRoutes = [
  {
    path: "/login",
    component: () => (
      <TokenProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </TokenProvider>
    ),
  },
  {
    path: "/register",
    component: () => (
      <TokenProvider>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </TokenProvider>
    ),
  },
  { path: "/pages-401", component: Pages401 },
];
export { authProtectedRoutes, publicRoutes };
