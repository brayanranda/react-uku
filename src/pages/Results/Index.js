import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ListClaseTextural from "./ListClaseTextural";
import ListGrupoTextural from "./ListGrupoTextural";
import ListDensidadSuelo from "./ListDensidadSuelo";

const Index = () => {

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100 mt-3">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Resultados</p>
              </div>
              <button className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                    icon={faDownload}
                  />
                Descargar
              </button>
            </div>
            <div className="mb-2">
              <p className="font-bold">Determinación de la Clase textural</p>
              <p>Con los datos del %Arena, %Limo y %Arcilla, se determina la clase textural del suelo, con los rangos de la siguiente tabla</p>
            </div>
            <ListClaseTextural />

            <div className="mt-14 mb-2">
              <p className="font-bold">Determinación de la Clase textural</p>
              <p>Con los datos del %Arena, %Limo y %Arcilla, se determina la clase textural del suelo, con los rangos de la siguiente tabla</p>
            </div>
            <ListGrupoTextural />

            <div className="mt-14 mb-2">
              <p className="font-bold">Determinación de la Clase textural</p>
              <p>Con los datos del %Arena, %Limo y %Arcilla, se determina la clase textural del suelo, con los rangos de la siguiente tabla</p>
            </div>
            <ListDensidadSuelo />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
