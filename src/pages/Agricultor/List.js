import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import AgricultorContext from "../../context/AgricultorContext";
import FormPut from "./FormPut";

const Index = () => {
  const { getAgricultores, agricultores } = useContext(AgricultorContext);
  const [data, setData] = useState([]);
  const [isFormPut, setIsFormPut] = useState(false);

  const toggleFormPut = (agricultor) => {
    setIsFormPut(!isFormPut);
    handlePut(agricultor);
  };

  useEffect(() => {
    getAgricultores();
  });

  const handlePut = (agricultor) => {
    console.log(agricultor);
  };

  return (
    <>
      <FormPut
        isFormPut={isFormPut}
        setIsFormPut={setIsFormPut}
        data={data}
        setData={setData}
        onSubmit={handlePut}
      />
      <div className="table-responsive fs-14">
        <table className="table">
          <thead>
            <tr>
              <th>identifiacion</th>
              <th>nombres</th>
              <th>apellidos</th>
              <th>telefono</th>
              <th>email</th>
              <th>fechaNacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {agricultores.map((agricultor, x) => (
              <tr key={x}>
                <td>{agricultor.identifiacion}</td>
                <td>{agricultor.nombres}</td>
                <td>{agricultor.apellidos}</td>
                <td>{agricultor.telefono}</td>
                <td>{agricultor.email}</td>
                <td>{agricultor.fechaNacimiento}</td>
                <td className="flex items-center">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                    icon={faEye}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      toggleFormPut(agricultor.identifiacion);
                    }}
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                    icon={faEdit}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
