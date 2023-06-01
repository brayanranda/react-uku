import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="table-responsive fs-14">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Interpretación</th>
              <th className="text-center">Rango del pH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{analisisSuelo?.idPhSuelo?.interpretacion}</td>
              <td className="text-center">{analisisSuelo?.phSuelo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
