import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { AgricultorProvider } from "../../context/AgricultorContext";
import ListAgricultor from "../ListaAgricultor/Index";
import FormPut from "./FormPut";
import { useParams } from "react-router-dom";

const Index = () => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [data, setData] = useState([]);
  let { id } = useParams();

  const handleSave = () => {
    // await postData(data);
    // await getAgricultores();
    // clearForm();
    console.log("Guardado");
  };

  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
    console.log("modal");
  };

  return (
    <div className="col-10 fixed top-0 right-0 mt-24 p-5">
      <FormPut
        isFormPut={isFormPut}
        setIsFormPut={setIsFormPut}
        data={data}
        setData={setData}
        onSubmit={handleSave}
      />
      <Row>
        <Col className="col-uku">
          <div className="flex items-center mb-4 justify-between w-100">
            <div className="flex items-center">
              <p className="text-2xl mr-2">Inicio</p>
              <p className="text-2xl">/</p>
              <p className="text-2xl ml-2 text-green-700">Lista Agricultor</p>
            </div>
            <Button onClick={() => {
              toggleFormPut()
            }} color="success">
              Agregar
            </Button>
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
