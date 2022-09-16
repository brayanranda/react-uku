import React, {useEffect, useContext}  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import AgricultorContext from "../../context/AgricultorContext";

const Index = () => {

  const { getAgricultores, agricultores } = useContext(AgricultorContext);

  useEffect(()=> {
    getAgricultores()
  })

  return (
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
          {Object.entries(agricultores).length > 0 ? (
            agricultores.map((agricultor, x) => (
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
                  className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                  icon={faEdit}
                />
              </td>
            </tr>
          ))
          ) : ("")}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
