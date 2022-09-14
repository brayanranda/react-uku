import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Index";
import Dashboard from "./pages/Dashboard/Index";
import Register from "./pages/Register/Index";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}
