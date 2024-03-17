"use client";
import React, { useEffect, useState, useRef } from "react";
import Grafica from "./Grafica";

const SensorsPlots = () => {
  const [sensorSimulated, setSensorSimulated] = useState();
  const [sensorID, setSensorID] = useState([]);
  const [renderGrafica, setRenderGrafica] = useState(false);

  useEffect(() => {
    const fetchSimulacion = async () => {
      try {
        const response = await fetch("api/simulation/sensors", {
          method: "GET",
        });
        const simulateddata = await response.json();
        if (!sensorID.length) {
          const nombres = simulateddata.map((sensor) =>
            Object.keys(sensor.value)
          );

          setSensorID(nombres[0]);
          setSensorSimulated(simulateddata);
          setRenderGrafica(true);
          console.log("Data simulada obtenida correctamente");
        }
      } catch (error) {
        console.log("Error al obtener los datos de simulacion", error);
      }
    };
    fetchSimulacion();
  }, []);

  return (
      <div className="w-full h-full">
        {sensorSimulated !== null &&
          sensorID !== null && // Only render if sensor names are available
          sensorID.map((name, index) => (
            <div
              key={index}
              className="mx-auto mb-10 bg-white border border-blue-600 rounded-lg shadow"
            >
              <div className="flex flex-col">
                
                <div className="mx-auto">
                  {renderGrafica && (
                    <Grafica sensorName={name} sensorData={sensorSimulated} />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

   
  );
};

export default SensorsPlots;
