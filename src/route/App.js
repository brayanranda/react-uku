import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" component={Login} />
      <Route path="/" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
    </Routes>
  </Router>
);

export default App;
