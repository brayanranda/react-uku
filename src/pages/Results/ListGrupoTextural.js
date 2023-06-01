import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="table-responsive fs-14">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Grupo textural</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{analisisSuelo?.idGrupoTextural?.nombre}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
