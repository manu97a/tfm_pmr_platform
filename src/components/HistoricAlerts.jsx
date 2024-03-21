import React from "react";
import { Chrono } from "react-chrono";
import { LuAlertTriangle } from "react-icons/lu";
const HistoricAlerts = ({ datos, sensorName }) => {
  return (
    <div className="p-8">
      <p className="mb-10 ms-6  m-2 text-red-500">Reporte de alertas</p>
      <ol className="relative border-red-500 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {datos.map((dato, index) => (
          <li className="mb-10 ms-6" key={index}>
            <div className="items-center justify-between p-4 bg-white border border-red-600 rounded-lg shadow-sm sm:flex">
              <span className="shadow-lg">
                <LuAlertTriangle
                  className="mx-auto shadow-lg text-red-600"
                  size={20}
                />
              </span>
              <time className="mb-1 text-xs font-bold text-black sm:order-last sm:mb-0">
                <span className="text-gray-500 mr-5">Sucedió a las: </span>{dato.time}
              </time>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                Valor registrado:{" "}
                <span className="font-semibold text-red-600">
                  {dato.value}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HistoricAlerts;
