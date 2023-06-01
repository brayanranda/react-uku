import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Interpretación: </p>
        <p className="w-2/5">{analisisSuelo?.idPhSuelo?.interpretacion}</p>
      </div>
      <hr></hr>
      <div className="px-3 py-2 bg-white flex items-center gap-8">
        <p className="w-3/5 font-bold">Rango del pH: </p>
        <p className="w-2/5">{analisisSuelo?.phSuelo}</p>
      </div>
    </div>
  );
};

export default Index;
