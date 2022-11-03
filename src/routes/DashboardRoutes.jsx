import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Index";
import Menu from "../UI/organism/Menu";
import Header from "../UI/organism/Header";
import { Row } from "reactstrap";
import Finca from "../pages/Finca/Index";
import TipoCultivo from "../pages/TipoCultivo/Index";
import Variedad from "../pages/Variedad/Index";
import Cultivo from "../pages/Cultivo/Index";
import Topografia from "../pages/Topografia/Index";
import DistanciaSiembra from "../pages/DistanciaSiembra/Index";
import Densidad from "../pages/Densidad/Index";
import Elemento from "../pages/Elemento/Index";
import ElementoVarided from "../pages/ElementoVariedad/Index";
import Enmienda from "../pages/Enmienda/Index";
import AnalisisElemento from "../pages/AnalisisElemento/Index";
import AnalisisSuelo from "../pages/AnalisisSuelo/Index";
import AbonoOrganico from "../pages/AbonoOrganico/Index";
import {
  AbonoOrganicoProvider,
  AgricultorProvider,
  AnalisisElementoProvider,
  AnalisisSueloProvider,
  CultivoProvider,
  DensidadProvider,
  DistanciaSiembraProvider,
  ElementoProvider,
  ElementoVariedadProvider,
  EnmiendaProvider,
  FincaProvider,
  TipoCultivoProvider,
  TopografiaProvider,
  VariedadProvider,
} from "../context";
export const DashboardRoutes = () => {
  return (
    <div className="relative">
      <Header />
      <Row className="w-100">
        <Menu />
        <Routes>
          <Route path="home" element={<Dashboard />} />
          <Route
            path="abono-organico"
            element={
              <AbonoOrganicoProvider>
                <AbonoOrganico />
              </AbonoOrganicoProvider>
            }
          />
          <Route
            path="analisis-elemento"
            element={
              <AnalisisElementoProvider>
                <AnalisisSueloProvider>
                  <ElementoProvider>
                    <AnalisisElemento />
                  </ElementoProvider>
                </AnalisisSueloProvider>
              </AnalisisElementoProvider>
            }
          />
          <Route
            path="analisis-suelo"
            element={
              <AnalisisSueloProvider>
                <CultivoProvider>
                  <DensidadProvider>
                    <AnalisisSuelo />
                  </DensidadProvider>
                </CultivoProvider>
              </AnalisisSueloProvider>
            }
          />
          <Route
            path="cultivo"
            element={
              <CultivoProvider>
                <FincaProvider>
                  <VariedadProvider>
                    <TopografiaProvider>
                      <DistanciaSiembraProvider>
                        <Cultivo />
                      </DistanciaSiembraProvider>
                    </TopografiaProvider>
                  </VariedadProvider>
                </FincaProvider>
              </CultivoProvider>
            }
          />
          <Route
            path="densidad"
            element={
              <DensidadProvider>
                <Densidad />
              </DensidadProvider>
            }
          />
          <Route
            path="distancia-siembra"
            element={
              <DistanciaSiembraProvider>
                <DistanciaSiembra />
              </DistanciaSiembraProvider>
            }
          />
          <Route
            path="elemento"
            element={
              <ElementoProvider>
                <Elemento />
              </ElementoProvider>
            }
          />
          <Route
            path="elemento-variedad"
            element={
              <ElementoVariedadProvider>
                <ElementoProvider>
                  <VariedadProvider>
                    <ElementoVarided />
                  </VariedadProvider>
                </ElementoProvider>
              </ElementoVariedadProvider>
            }
          />
          <Route
            path="enmienda"
            element={
              <EnmiendaProvider>
                <Enmienda />
              </EnmiendaProvider>
            }
          />
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
          <Route path="recomendacion-abono" element={<Dashboard />} />
          <Route
            path="tipo-cultivo"
            element={
              <TipoCultivoProvider>
                <TipoCultivo />
              </TipoCultivoProvider>
            }
          />
          <Route
            path="topografia"
            element={
              <TopografiaProvider>
                <Topografia />
              </TopografiaProvider>
            }
          />
          <Route
            path="variedad"
            element={
              <VariedadProvider>
                <TipoCultivoProvider>
                  <Variedad />
                </TipoCultivoProvider>
              </VariedadProvider>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Row>
    </div>
  );
};
