import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {name: "Bajo", value: "0.7"},
    {name: "Medio", value: "2.1"},
    {name: "Alto", value: "2.8"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm w-1/2">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th className="text-center">Rango de Aluminio Intercambiable <b>(meq / 100 g)</b></th>
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
