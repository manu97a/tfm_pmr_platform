"use client";
import React, { useEffect } from "react";
import mqtt from "mqtt";
import { PersonStanding } from "lucide-react";

const Ubicacion = () => {
  const [ubicacion, setUbicacion] = useState({
    top: 0,
    down: 0,
    left: 50,
    right: 0,
  });
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const client = mqtt.connect("mqtt://test.mosquitto.org:8080/mqtt"); // Cambia la URL del broker según tu configuración
    client.on("connect", () => {
      console.log("Conectado a MQTT correctamente");
      setConnected(true);
      client.subscribe("TFM_ubicacion"); // Cambia el topic según tus necesidades
    });
    client.on("message", (topic, message) => {
      let mensajeTexto = message.toString();
      let mensajeParseado = JSON.parse(mensajeTexto);
      setUbicacion(mensajeParseado);
      console.log(`Mensaje recibido en ${topic}:`, mensajeParseado);
    });
    return () => {
      if (client) {
        client.end();
        console.log("Desconectado de MQTT");
        setConnected(false);
      }
    };
  },[]);
  return (<>
    
    
  </>);
};

export default Ubicacion;
