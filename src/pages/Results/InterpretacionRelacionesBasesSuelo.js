import React from "react";

const Index = ({analisisSuelo}) => {
  
  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>Tipo de relación</th>
                {
                    analisisSuelo.analisisSueloRelacionBaseEntities && analisisSuelo.analisisSueloRelacionBaseEntities !== 0 &&
                      analisisSuelo.analisisSueloRelacionBaseEntities.map((element, index) =>
                        <th key={index}>{`Relación ${element?.idRelacionBase?.formula.split("=")[1]}`}</th>
                    )
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Resultado</th>
                {
                    analisisSuelo.analisisSueloRelacionBaseEntities && analisisSuelo.analisisSueloRelacionBaseEntities !== 0 &&
                      analisisSuelo.analisisSueloRelacionBaseEntities.map((element, index) =>
                        <td key={index}>{element?.valor}</td>
                    )
                }
              </tr>
              <tr>
                <th>Interpretación</th>
                {
                    analisisSuelo.analisisSueloRelacionBaseEntities && analisisSuelo.analisisSueloRelacionBaseEntities !== 0 &&
                      analisisSuelo.analisisSueloRelacionBaseEntities.map((element, index) =>
                        <td key={index}>{element?.idRelacionBase?.interpretacion}</td>
                    )
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
