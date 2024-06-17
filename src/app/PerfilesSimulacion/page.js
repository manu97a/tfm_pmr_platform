import ListaPerfiles from "@/components/ListaPerfiles";
import React from "react";

const PerfilesSimulacion = () => {
  return (
    <div className="text-3xl text-blue-600 font-light text-center p-8">
      <h3 className="drop-shadow-xl">Lista de Perfiles</h3>
      <ListaPerfiles/>
    </div>
  );
};

export default PerfilesSimulacion;
