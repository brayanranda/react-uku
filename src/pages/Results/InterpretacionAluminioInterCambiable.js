import React from "react";

const Index = ({analisisSuelo}) => {
  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Rango de Aluminio Intercambiable <b>(meq / 100 g)</b>: </p>
        <p className="w-2/5">{analisisSuelo?.aluminioIntercambiable} meq / 100 g</p>
      </div>
      <hr></hr>
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Interpretación: </p>
        <p className="w-2/5">{analisisSuelo?.idAluminioIntercambiable?.interpretacion}</p>
      </div>
    </div>
  );
};

export default Index;
