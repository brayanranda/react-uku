import React from "react";

const Index = ({analisisSuelo}) => {

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
                    <th className="text-center">Asufre (S)</th>
                </tr>
                <tr>
                    <th>Unidad</th>
                    <th className="text-center">mg/kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">cmol / kg</th>
                    <th className="text-center">mg / kg</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <th>Resultado</th>
                {
                  analisisSuelo && analisisSuelo.analisisElementoCollection && analisisSuelo.analisisElementoCollection.lenght !== 0 &&
                    analisisSuelo.analisisElementoCollection.map((element, index) => 
                      <td key={index} className="text-center">
                        {element.valor} {element?.idAnalisisElementoInterpretacion?.idElemento?.unidad}
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
                        {element?.idAnalisisElementoInterpretacion?.interpretacion}
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
