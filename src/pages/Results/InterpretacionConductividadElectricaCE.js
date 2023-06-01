import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {name: "Muy Bajo", value: "0.3", description: "No hay salinidad"},
    {name: "Bajo", value: "0.7", description: "No hay salinidad"},
    {name: "Medio", value: "1.5", description: "Ligera salinidad"},
    {name: "Alto", value: "2.8", description: "Suelo salino"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm w-1/2">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th className="text-center">Conductividad eléctrica (dS/m)</th>
                <th className="text-center">Interpretación</th>
                <th ></th>
              </tr>
            </thead>
            <tbody>
                {interpretacion.map((element, index) => (
                  <tr key={index}>
                    <td className="text-center">{element.value}</td>
                    <td className="text-center">{element.name}</td>
                    <td>{element.description}</td>
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
