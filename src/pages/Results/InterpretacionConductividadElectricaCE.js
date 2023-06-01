import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="table-responsive fs-14">
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="text-center">Conductividad eléctrica (dS/m)</th>
              <th className="text-center">Interpretación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{analisisSuelo?.conductividadElectrica}</td>
              <td className="text-center">{analisisSuelo?.idConductividadElectrica?.interpretacion}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
