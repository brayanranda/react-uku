import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import CultivoContext from "../../context/CultivoContext";
import ListVariedades from "./List";

const Index = () => {
  const { getEtapasFenologicas, etapasFenologicas, isLoading } =
    useContext(CultivoContext);

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">
                  Lista Etapas Fenológicas
                </p>
              </div>
            </div>
            <ListVariedades
              getEtapasFenologicas={getEtapasFenologicas}
              etapasFenologicas={etapasFenologicas}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
