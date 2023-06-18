import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "../UI/organism/Menu";
import Header from "../UI/organism/Header";
import { Row } from "reactstrap";
import Finca from "../pages/Finca/Index";
import Results from "../pages/Results/Index";
import Variedad from "../pages/Variedad/Index";
import Lote from "../pages/Lote/Index";
import Cultivo from "../pages/Cultivo/Index";
import AnalisisSuelo from "../pages/AnalisisSuelo/Index";
import {
  AgricultorProvider,
  AnalisisSueloProvider,
  CultivoProvider,
  DensidadProvider,
  FincaProvider,
  TipoCultivoProvider,
  VariedadProvider,
  TopografiaProvider,
  DistanciaSiembraProvider,
} from "../context";
import { LotesProvider } from "../context/LotesContext";
export const DashboardRoutes = () => {
  return (
    <div className="relative">
      <Header />
      <Row className="w-100">
        <Menu />
        <Routes>
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

          <Route
            path="results/:id"
            element={
              <AnalisisSueloProvider>
                <Results />
              </AnalisisSueloProvider>
            }
          />

          <Route
            path="analisis-suelo/:idLote"
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
            path="variedad"
            element={
              <VariedadProvider>
                <TipoCultivoProvider>
                  <Variedad />
                </TipoCultivoProvider>
              </VariedadProvider>
            }
          />

          <Route 
            path="lote/:idFinca"
            element={
              <LotesProvider>
                <Lote />
              </LotesProvider>
            }
          />

          <Route 
            path="cultivo"
            element={
              <FincaProvider>
                <VariedadProvider>
                  <TopografiaProvider>
                    <DistanciaSiembraProvider>
                      <CultivoProvider>
                        <Cultivo />
                      </CultivoProvider>
                    </DistanciaSiembraProvider>
                  </TopografiaProvider>
                </VariedadProvider>
              </FincaProvider>
            }
          />

          <Route 
            path="cultivo/:idFinca"
            element={
              <FincaProvider>
                <VariedadProvider>
                  <TopografiaProvider>
                    <DistanciaSiembraProvider>
                      <CultivoProvider>
                        <Cultivo />
                      </CultivoProvider>
                    </DistanciaSiembraProvider>
                  </TopografiaProvider>
                </VariedadProvider>
              </FincaProvider>
            }
          />

          <Route path="/" element={<Navigate to="/finca" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Row>
    </div>
  );
};
