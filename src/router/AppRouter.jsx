import { Route, Routes } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/Login/Index";
import Register from "../pages/Register/Index";
import { DashboardRoutes } from "../routes/DashboardRoutes";
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<Login />} />
              </Routes>
            </PublicRoute>
          }
        />
        <Route
          path="register/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<Register />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
