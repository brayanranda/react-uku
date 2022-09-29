import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Index";
import Register from "./pages/Register/Index";
import Login from "./pages/Login/Index";
import Page404 from "./pages/Page404";
import { AuthProvider } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";
import AuthRoute from "./context/AuthRoute";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <TokenProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            {localStorage.getItem("token-auth") !== null ? (
              <Route path="/home" element={<Dashboard />}></Route>
            ) : (
              <Route path="/home" element={<Page404 />}></Route>
            )}
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route> */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </TokenProvider>
    </div>
  );
}
