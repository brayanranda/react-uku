import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {interpretacion: "Bajo", frio: "3%", medio: "2%", calido: "1.5%"},
    {interpretacion: "Medio", frio: "7%", medio: "4%", calido: "3.5%"},
    {interpretacion: "Alto", frio: "11%", medio: "6%", calido: "4.7%"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th className="text-center">Interpretación de la M.O</th>
                <th className="text-center">Clima Frio {"(Altitud > 2000 msnm)"}</th>
                <th className="text-center">Clima Medio (Altitud 1000 a 2000 msnm)</th>
                <th className="text-center">Clima Cálido {"(Altitud < 1000 msnm)"}</th>
              </tr>
            </thead>
            <tbody>
                {interpretacion.map((element, index) => (
                  <tr key={index}>
                    <td className="text-center">{element.interpretacion}</td>
                    <td className="text-center">{element.frio}</td>
                    <td className="text-center">{element.medio}</td>
                    <td className="text-center">{element.calido}</td>
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
