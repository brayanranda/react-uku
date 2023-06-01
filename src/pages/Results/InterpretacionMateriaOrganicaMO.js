import React from "react";

const Index = ({analisisSuelo}) => {
  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="table-responsive fs-14">
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="text-center">Interpretación de la M.O</th>
              <th className="text-center">Materia Organica</th>
              <th className="text-center">Clima</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{analisisSuelo?.idMateriaOrganica?.interpretacion}</td>
              <td className="text-center">{analisisSuelo?.materiaOrganica}</td>
              <td className="text-center">{analisisSuelo?.idMateriaOrganica?.clima}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
