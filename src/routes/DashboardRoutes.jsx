import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Index";
import Menu from "../UI/organism/Menu";
import Header from "../UI/organism/Header";
import { Row } from "reactstrap";
import { AgricultorProvider } from "../context/AgricultorContext";
import { FincaProvider } from "../context/FincaContext";
import Finca from "../pages/Finca/Index";
export const DashboardRoutes = () => {
  return (
    <>
      <div className="relative">
        <Header />
        <Row className="w-100">
          <Menu />
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
            <Route
              path="finca"
              element={
                <FincaProvider>
                  <AgricultorProvider>
                    <Finca />
                  </AgricultorProvider>
                </FincaProvider>
              }
            />
            <Route path="municipio" element={<Dashboard />} />
            <Route path="recomendacion-abono" element={<Dashboard />} />
            <Route path="tipo-cultivo" element={<Dashboard />} />
            <Route path="topografia" element={<Dashboard />} />
            <Route path="variedad" element={<Dashboard />} />
            <Route path="vereda" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Row>
      </div>
    </>
  );
};
