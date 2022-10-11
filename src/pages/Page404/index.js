import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <main
      className="bg-green-100 flex items-center justify-center
    flex-col min-h-screen w-full"
    >
      <p className="text-9xl text-green-600">401</p>
      <p className="text-xl">
        Requiere autorización para visualizar esta página
      </p>
      <Link
        className="border-0 mt-12 text-xl btn-404 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        to="/"
      >
        Ir al inicio
      </Link>
    </main>
  );
};
export default index;
