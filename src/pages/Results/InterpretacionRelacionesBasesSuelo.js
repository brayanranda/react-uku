import React from "react";

const Index = ({analisisSuelo}) => {
  return (
    <>
      {
        analisisSuelo.analisisSueloRelacionBaseEntities && analisisSuelo.analisisSueloRelacionBaseEntities !== 0 &&
          analisisSuelo.analisisSueloRelacionBaseEntities.map((element, index) => 
            <div key={index}>
              <p className="mt-4">
                {
                  element?.idRelacionBase?.formula == "Ca ; Mg ; K = (Ca + Mg) / K "
                    ? `Relación entre las principales bases ${element?.idRelacionBase?.formula}`
                    : `Relación ${element?.idRelacionBase?.formula}`
                }
              </p>
              <div className="rounded-2xl bg-white shadow-sm w-1/2 mt-2">
                <div className="px-3 bg-white py-2 flex items-center gap-8">
                  <p className="w-3/5 font-bold">
                    {
                      element?.idRelacionBase?.formula == "Ca ; Mg ; K = (Ca + Mg) / K "
                        ? `Relación ${element?.idRelacionBase?.formula.split("=")[1]}`
                        : `Relación ${element?.idRelacionBase?.formula.split("=")[1].replace("/", ":")}`
                    }   
                  </p>
                  <p className="w-2/5">{element?.valor}</p>
                </div>
                <hr></hr>
                <div className="px-3 bg-white py-2 flex items-center gap-8">
                  <p className="w-3/5 font-bold">Interpretación: </p>
                  <p className="w-2/5">{element?.idRelacionBase?.interpretacion}</p>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
};

export default Index;
