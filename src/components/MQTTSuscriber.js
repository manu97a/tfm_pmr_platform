"use client"
import React,{useState,useEffect} from "react";
import mqtt from "mqtt";
const MQTTSuscriber = ({ topic, infotoShow }) => {
  const [message, setMessage] = useState({});
  const [info, setInfo] = useState("");

  useEffect(() => {
    const client = mqtt.connect("mqtt://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      console.log("Conectado a MQTT correctamente");
      client.subscribe(topic);
    });
    client.on("message", (topic, message) => {
      let mensajeTexto = message.toString();
      mensajeTexto = mensajeTexto.replace(/'/g, '"');
      let mensajeParseado = JSON.parse(mensajeTexto);
      console.log(
        `Received message ${JSON.stringify(mensajeParseado)} on topic ${topic}`
      );
      setMessage(mensajeParseado);
      switch (infoToShow) {
        case "hora":
          setInfo(mensajeParseado.hora);
          break;
        case "pulso":
          setInfo(mensajeParseado.pulso);
          break;
        case "saturacion":
          setInfo(mensajeParseado.saturacion);
          break;
        case "acelerometro":
          setInfo(mensajeParseado.acelerometro);
          break;
        default:
          setInfo("");
      }
    });

    return () => {
      client.end();
    };
  }, [topic, infotoShow]);
  return <p>{info}</p>;
};

export default MQTTSuscriber;
