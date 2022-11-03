import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/Login/Index";
import ForgotPassword from "../pages/ForgotPassword/Index";
import ChangePassword from "../pages/ChangePassword/Index";
import Register from "../pages/Register/Index";
import { DashboardRoutes } from "../routes/DashboardRoutes";
import Error from "../pages/Page404/index";
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
          path="forgot-password/*"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="change-password/:token"
          element={
            <PublicRoute>
              <ChangePassword />
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
        <Route path="not-found" element={<Error />} />
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
