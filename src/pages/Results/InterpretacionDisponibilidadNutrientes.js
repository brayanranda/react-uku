import React from "react";

const Index = ({analisisSuelo}) => {

  return (
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
                <tr>
                    <th></th>
                    <th colSpan={6} className="text-center">Nutrientes Disponibles en el Suelo</th>
                </tr>
                <tr>
                    <th>Interpretación</th>
                    <th className="text-center">Fosforo (P) <br></br> mg/kg</th>
                    <th className="text-center">Potasio (K) <br></br> cmol / kg</th>
                    <th className="text-center">Calcio (Ca)  <br></br> cmol / kg</th>
                    <th className="text-center">Magnesio (Mg) <br></br> cmol / kg</th>
                    <th className="text-center">Sodio (Na) <br></br> cmol / kg</th>
                    <th className="text-center">Asufre (S) <br></br> mg / kg</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                {
                  analisisSuelo.analisisElementoCollection && analisisSuelo.analisisElementoCollection.lenght !== 0 &&
                    <td>{analisisSuelo.analisisElementoCollection[0]?.idAnalisisElementoInterpretacion?.interpretacion}</td>
                }
                {
                  analisisSuelo && analisisSuelo.analisisElementoCollection && analisisSuelo.analisisElementoCollection.lenght !== 0 &&
                    analisisSuelo.analisisElementoCollection.map((element, index) => 
                      <td key={index} className="text-center">
                        {element.valor} {element?.idAnalisisElementoInterpretacion?.idElemento?.unidad}
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
