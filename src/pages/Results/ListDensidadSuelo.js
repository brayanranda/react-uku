import React from "react";

const Index = ({analisisSuelo}) => {

  return (
    <div className="rounded-2xl bg-white shadow-sm w-1/2">
      <div className="p-3 flex bg-white items-center gap-8">
        <p className="font-bold">Densidad Aparente (g/cm3): </p>
        <p>{analisisSuelo?.idDensidad?.valor} g/cm3</p>
      </div>
    </div>
  );
};

export default Index;
