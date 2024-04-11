"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import mqtt from "mqtt";
const AcelerometroCard = () => {
  const [acelerometro, setAcelerometro] = useState([]);
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
        setAcelerometro(parsedMessage.acelerometro);
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
    <div class="bg-white border border-amber-400 rounded-lg shadow flex flex-col justify-between font-light">
      <div className="w-full h-full flex items-center justify-center">
        <img src="/imagenesCartas/caida.png" class="w-[70%]" alt="pulsocard" />
      </div>
      <div class="p-4 pt-2 text-center">
        <div class="mb-8">
          <p class="text-xl text-amber-400">Acelerómetro</p>
          <div class="text-gray-900 font-light text-lg mb-2 hover:text-amber-600 inline-block">
            <div className="flex flex-col">
              <p className="mr-1 text-amber-400">Fecha: <span className="text-black">{fecha}</span> </p>
              <p className="mr-1 text-amber-400">Hora: <span className="text-black">{hora}</span> </p>
      
            </div>
            <div className="flex">
              <p className="mr-1 text-amber-400">Último valor: <span className="text-black">{acelerometro}</span></p>
            
            </div>
          </div>
          <div class="text-gray-700 text-sm">
            <Link href="AcelerometroDetalle" className="m-3 p-3">
              <button
                type="button"
                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Ver Más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcelerometroCard