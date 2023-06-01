import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Conductividad eléctrica (dS/m): </p>
        <p className="w-2/5">{analisisSuelo?.conductividadElectrica}</p>
      </div>
      <hr></hr>
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Interpretación: </p>
        <p className="w-2/5">{analisisSuelo?.idConductividadElectrica?.interpretacion}</p>
      </div>
    </div>
  );
};

export default Index;
