import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {value: "1.3", interpretacion: "Baja, hay dificultad con la disponibilidad del Ca"},
    {value: "4", interpretacion: "Ideal"},
    {value: "5.8", interpretacion: "Alta, hay dificultad con la disponibilidad del Mg"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm w-1/2">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th className="text-center">Relación Ca : Mg</th>
                <th>Interpretación</th>
              </tr>
            </thead>
            <tbody>
                {interpretacion.map((element, index) => (
                  <tr key={index}>
                    <td className="text-center">{element.value}</td>
                    <td>{element.interpretacion}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
