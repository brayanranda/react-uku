import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const grupos = [
    {name: "Muy Finos", value: "Arcillosa muy fina (>60%)"},
    {name: "Finos", value: "Arcillosa, ARcillo arenosa, Arcillo limosa"},
    {name: "Moderadamente Finos", value: "Franco arcillosa, Franco arcillo arenosa, Franco arcillo limosa, Franca, Franco limosa"},
    {name: "Medios", value: "Franco arcillo limosa (<35% de arcilla y <15% de arena), Franco limosa (>18% de arcilla y <15% de arena)"},
    {name: "Moderadamente gruesos", value: "Franca, Franco arenosa, Franco limosa (<18% de arcilla y <15% de arena), Limosa"},
    {name: "Gruesos", value: "Arenosa, Arenosa franca"}
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>#</th>
                <th>Grupo textural</th>
                <th>Clase textural</th>
              </tr>
            </thead>
            <tbody>
                {grupos.map((element, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{element.name}</td>
                    <td>{element.value}</td>
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
