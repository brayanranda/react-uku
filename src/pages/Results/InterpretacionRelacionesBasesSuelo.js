import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <>
      {
        analisisSuelo.analisisSueloRelacionBaseEntities && analisisSuelo.analisisSueloRelacionBaseEntities !== 0 &&
          analisisSuelo.analisisSueloRelacionBaseEntities.map((element, index) => 
            <div key={index}>
              <p className="mt-5">
                {
                  element?.idRelacionBase?.formula == "Ca ; Mg ; K = (Ca + Mg) / K "
                    ? `Relación entre las principales bases ${element?.idRelacionBase?.formula}`
                    : `Relación ${element?.idRelacionBase?.formula}`
                }
              </p>
              <div className="rounded-2xl bg-white shadow-sm w-1/2 mb-5">
                <div className="table-responsive fs-14">
                  <table className="table bg-white">
                    <thead>
                      <tr>
                        <th className="text-center">
                          {
                            element?.idRelacionBase?.formula == "Ca ; Mg ; K = (Ca + Mg) / K "
                              ? `Relación ${element?.idRelacionBase?.formula.split("=")[1]}`
                              : `Relación ${element?.idRelacionBase?.formula.split("=")[1].replace("/", ":")}`
                          }
                        </th>
                        <th>Interpretación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">{element?.valor}</td>
                        <td>{element?.idRelacionBase?.interpretacion}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
};

export default Index;
