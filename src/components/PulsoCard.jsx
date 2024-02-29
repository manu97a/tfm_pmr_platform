import React from "react";
import Link from "next/link";
import MQTTSuscriber from "./MQTTSuscriber";

const PulsoCard = () => {
  return (
    <div className="bg-white border border-red-200 rounded-lg shadow flex flex-col justify-between font-light">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/imagenesCartas/pulso.png"
          className="max-w-full animate-pulse"
          alt="pulsocard"
        />
      </div>
      <div className="p-4 pt-2 text-center">
        <div className="mb-8">
          <p className="text-xl text-red-600">Pulso</p>
          <div className="text-gray-900 font-light text-lg mb-2 hover:text-red-600 inline-block">
            <div className="flex">
              <p className="mr-1 text-red-600">Hora: </p>
              <MQTTSuscriber topic={"datos_basicos"} infoToShow={"hora"} />
            </div>
            <div className="flex">
              <p className="mr-1 text-red-600">Último valor: </p>
              <MQTTSuscriber topic={"datos_basicos"} infoToShow={"pulso"} />
            </div>
          </div>
          <div className="text-gray-700 text-sm">
            <Link href="pulsoDetalle" className="m-3 p-3">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Ver Más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulsoCard;
