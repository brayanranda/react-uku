import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Index";
import Register from "./pages/Register/Index";
import Login from "./pages/Login/Index";
import Page404 from "./pages/Page404";
// import { AuthProvider } from "./context/auth";
import { AuthProvider, AuthRoute } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";

console.log("estoy entrrnado a app");
export default function App() {
  return (
    <div className="App">
      <TokenProvider>
        <AuthProvider>
          {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              }
            />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
          {/* </BrowserRouter> */}
        </AuthProvider>
      </TokenProvider>
    </div>
  );
}
