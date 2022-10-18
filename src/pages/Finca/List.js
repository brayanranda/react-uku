import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({
  getFincas,
  fincas,
  putData,
  corregimientos,
  municipios,
  veredas,
  agricultores,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: 0,
    areaEnUso: 0,
    geolocalizacion: "",
    ideAgricultor: { identificacion: 0 },
    idCorregimiento: { idCorregimiento: 1 },
    idMunicipio: { idMunicipio: 1 },
    idVereda: { idVereda: 1 },
  });

  const toggleFormPut = (finca) => {
    setFincaData(finca);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    getFincas();
  }, []);

  const handlePut = async () => {
    await putData(fincaData);
    await getFincas();
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
          corregimientos={corregimientos}
          municipios={municipios}
          veredas={veredas}
          agricultores={agricultores}
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
                  <td>{finca.idFinca}</td>
                  <td>{finca.nombre}</td>
                  <td>{finca.areaTotal}</td>
                  <td>{finca.areaEnUso}</td>
                  <td>{finca.geolocalizacion}</td>
                  <td>
                    {finca.idAgricultor.nombres +
                      " " +
                      finca.idAgricultor.apellidos}
                  </td>
                  <td>{finca.idCorregimiento.nombre}</td>
                  <td>{finca.idMunicipio.nombre}</td>
                  <td>{finca.idVereda.nombre}</td>
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
