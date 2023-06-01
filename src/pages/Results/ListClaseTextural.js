import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="table-responsive fs-14">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Clase textural</th>
              <th>% Arena</th>
              <th>% Limo</th>
              <th>% Arcilla</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{analisisSuelo?.idClaseTextural?.nombre} ({analisisSuelo?.idClaseTextural?.sigla})</td>
                  <td>{analisisSuelo?.porcentArena}</td>
                  <td>{analisisSuelo?.porcentLimos}</td>
                  <td>{analisisSuelo?.porcentArcilla}</td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
