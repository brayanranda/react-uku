import React from "react";

const Index = ({analisisSuelo}) => {
  const color = (data) => {
    const interpretacion = {
      ["Muy bajo"]: "bg-red-500",
      Medio: "bg-yellow-500",
      Bajo: "bg-orange-500",
      Alto: "bg-green-500",
    }

    const defaultColor = "bg-gray-100"
    return interpretacion[data] || defaultColor
  }

  return (
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
                <tr>
                    <th>Nutriente</th>
                    <th className="text-center">Fosforo (P)</th>
                    <th className="text-center">Potasio (K)</th>
                    <th className="text-center">Calcio (Ca)</th>
                    <th className="text-center">Magnesio (Mg)</th>
                    <th className="text-center">Sodio (Na)</th>
                    <th className="text-center">Azufre (S)</th>
                    <th className="text-center">Boro (B)</th>
                    <th className="text-center">Cobre (Cu)</th>
                </tr>
                <tr>
                    <th>Unidad</th>
                    <th className="text-center">ppm</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">ppm</th>
                    <th className="text-center">ppm</th>
                    <th className="text-center">ppm</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <th>Resultado</th>
                {
                  analisisSuelo && analisisSuelo.analisisElementoCollection && analisisSuelo.analisisElementoCollection.lenght !== 0 &&
                    analisisSuelo.analisisElementoCollection.map((element, index) => 
                      <td key={index} className="text-center">
                        {element.valor}
                      </td>
                    )
                }
              </tr>
              <tr>
                <th>Interpretación</th>
                {
                  analisisSuelo && analisisSuelo.analisisElementoCollection && analisisSuelo.analisisElementoCollection.lenght !== 0 &&
                    analisisSuelo.analisisElementoCollection.map((element, index) => 
                      <td key={index} className="text-center">
                        <p className="mx-auto flex flex-wrap items-center gap-2 justify-center bg-slate-200 rounded-md sm:rounded-full w-fit px-2 py-1">
                          <span className={`flex w-5 h-5 rounded-full ${color(element?.idAnalisisElementoInterpretacion?.interpretacion)}`}></span>
                          {element?.idAnalisisElementoInterpretacion?.interpretacion}s
                        </p>
                      </td>
                    )
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Index;