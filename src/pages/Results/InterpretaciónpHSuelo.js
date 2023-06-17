import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>Determinación</th>
                <th>Unidad</th>
                <th>Resultado</th>
                <th>Interpretación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>pH</th>
                <th></th>
                <td>{analisisSuelo?.phSuelo}</td>
                <td>{analisisSuelo?.idPhSuelo?.interpretacion}</td>
              </tr>
              <tr>
                <th>Aluminio Intercambiable</th>
                <th>cmol / kg</th>
                <td>{analisisSuelo?.aluminioIntercambiable}</td>
                <td>{analisisSuelo?.idAluminioIntercambiable?.interpretacion}</td>
              </tr>
              <tr>
                <th>Conductividad Eléctrica (CE)</th>
                <th>dS / m</th>
                <td>{analisisSuelo?.conductividadElectrica}</td>
                <td>{analisisSuelo?.idConductividadElectrica?.interpretacion}</td>
              </tr>
              <tr>
                <th>Capacidad de Intercambio Catiónico (CIC)</th>
                <th>cmol / kg</th>
                <td>{analisisSuelo?.intercambioCationico}</td>
                <td>{analisisSuelo?.idIntercambioCationico?.interpretacion}</td>
              </tr>
              <tr>
                <th>Materia Orgánica (M.O.)</th>
                <th>%</th>
                <td>{analisisSuelo?.materiaOrganica}</td>
                <td>{analisisSuelo?.idMateriaOrganica?.interpretacion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
