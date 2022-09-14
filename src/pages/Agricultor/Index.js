import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import FormAgricultor from "../../UI/organism/Modals/FormAgricultor";
import ListAgricultor from "../ListaAgricultor/Index";
// import { useParams } from "react-router-dom";
// import AgricultorContext from "../../context/agricultorContext";

const Index = () => {
  const [modal_large, setmodal_large] = useState(false);

  // let { id } = useParams();
  // const [data, setData] = useState({});

  // const { getAgricultores, agricultores, setAgricultores, postData } =
  //   useContext(AgricultorContext);

  // const handleSave = async () => {
  //   await postData(data);
  //   await getAgricultores();
  //   clearForm();
  // };

  // const clearForm = () => {
  //   setData({
  //     customer_id: id,
  //     date_call_note: "",
  //     note: "",
  //     subject: "",
  //     type: "FACE TO FACE",
  //   });
  // };

  return (
    <div className="col-10 fixed top-0 right-0 mt-24 p-5">
      <FormAgricultor
        modal_large={modal_large}
        setmodal_large={setmodal_large}
      />
      {/* <FormAgricultor data={data} setData={setData} onSubmit={handleSave} /> */}
      <Row>
        <Col className="col-uku">
          <div className="flex items-center mb-4 justify-between w-100">
            <div className="flex items-center">
              <p className="text-2xl mr-2">Inicio</p>
              <p className="text-2xl">/</p>
              <p className="text-2xl ml-2 text-green-700">
                Lista Abonos organicos
              </p>
            </div>
            <Button
              color="success"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Agregar
            </Button>
          </div>
          <div className="rounded-2xl bg-white shadow-sm">
            <ListAgricultor />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
