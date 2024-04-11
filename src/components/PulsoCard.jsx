"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import MQTTSuscriber from "./MQTTSuscriber";
import mqtt from "mqtt";
const PulsoCard = () => {
  const [pulso, setPulso] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [hora, setHora] = useState([]);
  useEffect(() => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      console.log("Obteniendo estado de dispositivos");
      client.subscribe("TFM_Salud");
      client.subscribe("TFM_Tiempo");
    });
    client.on("message", (topic, message) => {
      if (topic === "TFM_Salud") {
        let messageString = message.toString();
        const parsedMessage = JSON.parse(messageString);
        setPulso(parsedMessage.pulso);
      } else if (topic === "TFM_Tiempo") {
        let messageString = message.toString();
        const [fecha, hora] = messageString.split(" ");
        setFecha(fecha);
        setHora(hora);
      }
    });
    return () => {
      client.end();
    };
  }, []);
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
            <div className="flex flex-col">
              <p className="mr-1 text-red-600">
                Fecha: <span className="text-black">{fecha}</span>{" "}
              </p>

              <p className="text-red-600">Hora: <span className="text-black">{hora}</span></p>

            </div>
            <div className="flex">
           
              <p className="mr-1 text-red-600">Último valor: <span className="text-black">{pulso}</span> </p>
            </div>
          </div>
          <div className="text-gray-700 text-sm">
            <Link href="PulsoDetalle" className="m-3 p-3">
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
