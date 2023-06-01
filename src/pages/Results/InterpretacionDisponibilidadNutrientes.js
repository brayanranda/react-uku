import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const data = [
    {interpretacion: "Muy Bajo", fosforo: "8", potasio: "0.2", calcio: "1.5", magnesio: "0.3", sodio: "", asufre: ""},
    {interpretacion: "Bajo", fosforo: "14", potasio: "0.3", calcio: "3.0", magnesio: "0.7", sodio: "0,009", asufre: "7.2"},
    {interpretacion: "Medio", fosforo: "25", potasio: "0.5", calcio: "5.7", magnesio: "1.3", sodio: "0.3", asufre: "10.4"},
    {interpretacion: "Alto", fosforo: "47", potasio: "0.8", calcio: "6.9", magnesio: "2.0", sodio: "0.8", asufre: "16.3"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
                <tr>
                    <th></th>
                    <th colSpan={6} className="text-center">Nutrientes Disponibles en el Suelo</th>
                </tr>
                <tr>
                    <th>Interpretación</th>
                    <th className="text-center">Fosforo (P) <br></br> mg/kg</th>
                    <th className="text-center">Potasio (K) <br></br> cmol / kg</th>
                    <th className="text-center">Calcio (Ca)  <br></br> cmol / kg</th>
                    <th className="text-center">Magnesio (Mg) <br></br> cmol / kg</th>
                    <th className="text-center">Sodio (Na) <br></br> cmol / kg</th>
                    <th className="text-center">Asufre (S) <br></br> mg / kg</th>
                </tr>
            </thead>
            <tbody>
                {data.map((element, index) => (
                  <tr key={index}>
                    <td>{element.interpretacion}</td>
                    <td className="text-center">{element.fosforo}</td>
                    <td className="text-center">{element.potasio}</td>
                    <td className="text-center">{element.calcio}</td>
                    <td className="text-center">{element.magnesio}</td>
                    <td className="text-center">{element.sodio}</td>
                    <td className="text-center">{element.asufre}</td>
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
