import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="table-responsive fs-14">
        <table className="table bg-white ">
          <thead>
            <tr >
              <th>% Arena</th>
              <th>% Limo</th>
              <th>% Arcilla</th>
              <th>Clase textural</th>
              <th>Grupo textural</th>
            </tr>
          </thead>
          <tbody>
                <tr >
                  <td>{analisisSuelo?.porcentArena}</td>
                  <td>{analisisSuelo?.porcentLimos}</td>
                  <td>{analisisSuelo?.porcentArcilla}</td>
                  <td>{analisisSuelo?.idClaseTextural?.nombre} ({analisisSuelo?.idClaseTextural?.sigla})</td>
                  <td>{analisisSuelo?.idGrupoTextural?.nombre}</td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
