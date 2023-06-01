import React from "react";

const Index = ({analisisSuelo}) => {

  return (
  <div className="rounded-2xl bg-white shadow-sm w-1/2">
    <div className="table-responsive fs-14">
      <table className="table bg-white">
        <thead>
          <tr>
            <th className="text-center">Capacidad de Intercambio Catiónico (CIC)</th>
            <th className="text-center">Interpretación</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td className="text-center">{analisisSuelo?.intercambioCationico}</td>
                <td className="text-center">{analisisSuelo?.idIntercambioCationico?.interpretacion}</td>
              </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Index;
