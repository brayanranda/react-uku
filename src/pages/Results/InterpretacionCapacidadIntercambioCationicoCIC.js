import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {name: "Muy Bajo", value: "3"},
    {name: "Bajo", value: "7"},
    {name: "Medio", value: "15"},
    {name: "Alto", value: "28"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm w-1/2">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th className="text-center">Capacidad de Intercambio Catiónico (CIC) </th>
                <th className="text-center">Interpretación</th>
              </tr>
            </thead>
            <tbody>
                {interpretacion.map((element, index) => (
                  <tr key={index}>
                    <td className="text-center">{element.value}</td>
                    <td className="text-center">{element.name}</td>
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
