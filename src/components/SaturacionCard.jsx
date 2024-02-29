import React from "react";
import Link from "next/link";
import MQTTSuscriber from "./MQTTSuscriber";

const SaturacionCard = () => {
  return (
    <div className=" bg-white border border-cyan-200 rounded-lg shadow flex flex-col justify-between font-light">
      <img
        src="/imagenesCartas/oxigenito.png"
        className="w-full mb-3 animate-pulse"
        alt="pulsocard"
      />
      <div className="p-4 pt-2 text-center">
        <div className="mb-8">
          <p className="text-xl text-blue-600">Saturacion</p>
          <div className="text-gray-900 font-light text-lg mb-2 hover:text-cyan-600 inline-block">
            <div className="flex">
              <p className="mr-1 text-blue-600">Hora: </p>
              <MQTTSuscriber topic={"datos_basicos"} infoToShow={"hora"} />
            </div>
            <div className="flex">
              <p className="mr-1 text-blue-600">Último valor: </p>
              <MQTTSuscriber
                topic={"datos_basicos"}
                infoToShow={"saturacion"}
              />
            </div>
          </div>
          <div className="text-gray-700 text-sm">
            <Link href="saturacionDetalle" className="m-3 p-3">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default SaturacionCard;
