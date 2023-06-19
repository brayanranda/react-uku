import React from "react";

const RecomendacionLabranza = ({analisisSuelo}) => {

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>Grupo textural</th>
                <th>Densidad Aparente (g/cm3)</th>
                <th>Tipo de labranza</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>pH</th>
                <th></th>
                <td>{analisisSuelo?.phSuelo}</td>
                <td>{analisisSuelo?.idPhSuelo?.interpretacion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecomendacionLabranza;
