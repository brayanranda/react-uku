import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Index";
export const DashboardRoutes = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route path="abono-organico" element={<Dashboard />} />
          <Route path="analisis" element={<Dashboard />} />
          <Route path="corregimiento" element={<Dashboard />} />
          <Route path="cultivo" element={<Dashboard />} />
          <Route path="densidad" element={<Dashboard />} />
          <Route path="departamento" element={<Dashboard />} />
          <Route path="distancia-siembra" element={<Dashboard />} />
          <Route path="elemento" element={<Dashboard />} />
          <Route path="etapa-fenelogica" element={<Dashboard />} />
          <Route path="finca" element={<Dashboard />} />
          <Route path="municipio" element={<Dashboard />} />
          <Route path="recomendacion-abono" element={<Dashboard />} />
          <Route path="tipo-cultivo" element={<Dashboard />} />
          <Route path="topografia" element={<Dashboard />} />
          <Route path="variedad" element={<Dashboard />} />
          <Route path="vereda" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
