import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
// import AgricultorContext from "../../context/agricultorContext";

const Index = () => {
  // const { getAgricultores, agricultores, setAgricultores, postData } =
  //   useContext(AgricultorContext);

  return (
    <div className="table-responsive fs-14">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Location</th>
            <th>Sold Ticket</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((e, x) => (
            <tr key={x}>
              <td>#0012451</td>
              <td>04/08/2020 12:34 AM</td>
              <td>Elisabeth Queen</td>
              <td>Medan, Indonesia</td>
              <td>4 Pcs</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
