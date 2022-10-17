import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({ fincas, putData }) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [fincaData, setFincaData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
  });

  const toggleFormPut = (finca) => {
    setFincaData(finca);
    setIsFormPut(!isFormPut);
  };

  // useEffect(() => {
  //   getAgricultores();
  // }, []);

  const handlePut = async () => {
    await putData(fincaData);
    // await getAgricultores();
    setIsFormPut(!isFormPut);
  };

  return (
    <>
      <Toaster />
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={fincaData}
          setData={setFincaData}
          onSubmit={handlePut}
        />
      ) : null}
      <div className="table-responsive fs-14">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Area total</th>
              <th>Area en uso</th>
              <th>Geolocalización</th>
              <th>Agricultor</th>
              <th>Corregimiento</th>
              <th>Municipio</th>
              <th>Vereda</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fincas).length > 0 ? (
              fincas.map((finca, x) => (
                <tr key={x}>
                  <td>{finca.nombre}</td>
                  <td>{finca.areaTotal}</td>
                  <td>{finca.areaEnUso}</td>
                  <td>{finca.geolocalizacion}</td>
                  <td>{finca.ideAgricultor[x].ideAgricultor}</td>
                  <td>{finca.idCorregimiento[x].idCorregimiento}</td>
                  <td>{finca.idMunicipio[x].idMunicipio}</td>
                  <td>{finca.idVereda[x].idVereda}</td>
                  <td>
                    <FontAwesomeIcon
                      className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                      icon={faEye}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        toggleFormPut(finca);
                      }}
                      className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                      icon={faEdit}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No found data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
