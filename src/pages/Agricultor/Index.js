import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { AgricultorProvider } from "../../context/AgricultorContext";
import ListAgricultor from "./List";
import { useParams } from "react-router-dom";

const Index = () => {
  let { id } = useParams();

  const handleSave = () => {
    console.log("Guardado");
  };

  return (
    <div className="col-10 fixed top-0 right-0 mt-24 p-5">
      <Row>
        <Col className="col-uku">
          <div className="flex items-center mb-4 justify-between w-100">
            <div className="flex items-center">
              <p className="text-2xl mr-2">Inicio</p>
              <p className="text-2xl">/</p>
              <p className="text-2xl ml-2 text-green-700">Lista Agricultor</p>
            </div>
            <button className="bg-green-700 rounded-md text-white hover:bg-green-700">
              Agregar
            </button>
          </div>
          <div className="rounded-2xl bg-white shadow-sm">
            <AgricultorProvider>
              <ListAgricultor />
            </AgricultorProvider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
