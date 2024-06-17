
import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import Tooltip from "@mui/material/Tooltip";
import { set } from "mongoose";
// import { Toaster,toast } from "sonner";

const MapaActuadores = () => {
  const [coordenadas, setCoordenadas] = useState({ x: null, y: null });
  const [actuadoresMQTT, setActuadoresMQTT] = useState([]);
  const [lucesMQTT, setLucesMQTT] = useState([]);
  const [ubicacion, setUbicacion] = useState({
    x: 0,
    y: 0,
  });
  const compareLocations = (ubicacion, actuators) => {
    const distances = actuators.map((actuator) => {
      const dx = Math.abs(ubicacion.x - actuator.xcoordinate);
      const dy = Math.abs(ubicacion.y - actuator.ycoordinate);
      return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
    });

    const closestIndex = distances.indexOf(Math.min(...distances));

    return {
      closestActuator: actuators[closestIndex],
      distanceToClosest: distances[closestIndex],
    };
  };
  const compareLocationsLights = (ubicacion, lights) => {
    const distances = lights.map((light) => {
      const dx = Math.abs(ubicacion.x - light.xcoordinate);
      const dy = Math.abs(ubicacion.y - light.ycoordinate);
      return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
    });

    const closestIndex = distances.indexOf(Math.min(...distances));

    return {
      closestLight: lights[closestIndex],
      distanceToClosestLight: distances[closestIndex],
    };
  };
  const [connected, setConnected] = useState(false);
  const handleClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    // Obtener las coordenadas del clic
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    setCoordenadas({ x, y });
  };
  const [data, setData] = useState(null);
  const [memoriaActuador, setMemoriaActuador] = useState();
  const [ruta, setRuta] = useState(null);
  const [luces, setLuces] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [cercania, setCercania] = useState();
  const [cercaniaLuces, setCercaniaLuces] = useState();
  const [distancia, setDistancia] = useState();
  const [distanciaLuces, setDistanciaLuces] = useState();
  const imageWidth = 800;
  const imageHeight = 700;
  // const [toastAlert, setToastAlert] = useState("");

  const getActuatorValue = (actuatorName) => {
    const value = actuadoresMQTT[actuatorName];
    return typeof value !== "undefined" ? value : null;
  };
  const getLuzValue = (luzName) => {
    const value = lucesMQTT[luzName];
    return typeof value !== "undefined" ? value : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actuadoresRes, coordenadasRes, lucesRes] = await Promise.all([
          fetch("/api/actuadores").then((res) => res.json()),
          fetch("/api/coordenadas").then((res) => res.json()),
          fetch("/api/luces").then((res) => res.json()),
        ]);
        setData(actuadoresRes);
        setRuta(coordenadasRes);
        setLuces(lucesRes);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const client = mqtt.connect("mqtt://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      console.log("Conectado a MQTT correctamente");
      client.subscribe(["TFM_ubicacion", "TFM_actuadores", "TFM_luces"]);
    });
    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      switch (topic) {
        case "TFM_ubicacion":
          setUbicacion(data);
          break;
        case "TFM_actuadores":
          setActuadoresMQTT(data);
          break;
        case "TFM_luces":
          setLucesMQTT(data);
          break;
        default:
          break;
      }
    });
    return () => {
      client.end();
      console.log("Desconectado de MQTT");
    };
  }, []);

  useEffect(() => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      client.subscribe(["TFM_actuadores", "TFM_luces"]);
    });

    if (ubicacion.x && ubicacion.y && data && luces) {
      const { closestActuator, distanceToClosest } = compareLocations(
        ubicacion,
        data
      );
      const { closestLight, distanceToClosestLight } = compareLocationsLights(
        ubicacion,
        luces
      );
      if (distanceToClosest <= 100) {
        setCercania(closestActuator.name);
        const estadoActuador = getActuatorValue(closestActuator.name);

        if (estadoActuador === 0) {
          const nuevoEstado = 1;
          const actualizar = JSON.stringify({
            ...actuadoresMQTT,
            [closestActuator.name]: nuevoEstado,
          });
          client.publish("TFM_actuadores", actualizar);
        }
        setDistancia(distanceToClosest);
        // toast.info(`Se ha encendido ${closestActuator.name}`);
      } else {
        setCercania("Ningún actuador cercano");
        setDistancia(0);
        const estadoActuador = getActuatorValue(closestActuator.name);
        if (estadoActuador === 1) {
          const nuevoEstado = 0;
          const actualizar = JSON.stringify({
            ...actuadoresMQTT,
            [closestActuator.name]: nuevoEstado,
          });
          client.publish("TFM_actuadores", actualizar);
        }
        // toast.info(`Se ha apagado ${closestActuator.name}`);
      }
      if (distanceToClosestLight <= 80) {
        setCercaniaLuces(closestLight.name);
        const estadoLuz = getLuzValue(closestLight.name);

        if (estadoLuz === 0) {
          const nuevoEstadoLuz = 1;
          const actualizarLuz = JSON.stringify({
            ...lucesMQTT,
            [closestLight.name]: nuevoEstadoLuz,
          });
          client.publish("TFM_luces", actualizarLuz);
        }
        setDistanciaLuces(distanceToClosestLight);
      } else {
        setCercaniaLuces("Ninguna luz cerca");
        setDistanciaLuces(0);
        const estadoLuz = getLuzValue(closestLight.name);
        if (estadoLuz === 1) {
          const nuevoEstadoLuz = 0;
          const actualizarLuz = JSON.stringify({
            ...lucesMQTT,
            [closestLight.name]: nuevoEstadoLuz,
          });
          client.publish("TFM_luces", actualizarLuz);
        }
      }
    }
    return () => {
      client.end();
    };
  }, [ubicacion, data, luces]);
  // useEffect(() => {
  //   if (toastAlert !== "") {
  //     toast.info(toastAlert);
  //   }
  // }, [toastAlert]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      <h2 className="text-center font-light text-xl p-8 text-blue-500">
        Simulación Automática
      </h2>
     {/* <Toaster richColors/> */}
      <div className="grid grid-cols-4 py-5">
        <div>
          <SettingsRemoteIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#0077FF",
              padding: "5px",
            }}
          />
          <span className="p-8 text-blue-500">Actuadores</span>
        </div>
        <div>
          <DirectionsRunIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#298816",
              padding: "5px",
            }}
          />
          <span className="p-8 text-blue-500">Ruta de la simulación</span>
        </div>
        <div>
          <WbIncandescentIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#FF7E04",
              padding: "5px",
            }}
          />
          <span className="p-8 text-blue-500">Luces</span>
        </div>
        <div>
          <PersonPinCircleIcon
            fontSize="large"
            style={{
              color: "#FF5733",
              backgroundColor: "white",
              padding: "5px",
            }}
          ></PersonPinCircleIcon>
          <span className="p-8 text-blue-500">Ubicación Actual Paciente</span>
        </div>
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src="/planocasa.png"
          alt="Imagen"
          onClick={handleClick}
          style={{
            cursor: "crosshair",
            width: imageWidth,
            height: imageHeight,
          }}
        />
        {luces.map((item, index) => (
          <Tooltip key={index} title={item.name} placement="top">
            <WbIncandescentIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundColor: "#FF7E04",
                padding: "5px",
                position: "absolute",
                left: item.xcoordinate,
                top: item.ycoordinate,
                borderRadius: "50%",
                zIndex: 999,
              }}
            ></WbIncandescentIcon>
          </Tooltip>
        ))}
        {data.map((item, index) => (
          <Tooltip key={index} title={item.name} placement="top">
            <SettingsRemoteIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundColor: "#0077FF",
                padding: "5px",
                position: "absolute",
                left: item.xcoordinate,
                top: item.ycoordinate,
                borderRadius: "50%",
                zIndex: 999,
              }}
            ></SettingsRemoteIcon>
          </Tooltip>
        ))}
        {ruta.map((item, index) => (
          <Tooltip key={index} title={item._id} placement="top">
            <DirectionsRunIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundColor: "#298816",
                padding: "5px",
                position: "absolute",
                left: item.x,
                top: item.y,
                borderRadius: "50%",
                zIndex: 999,
              }}
            ></DirectionsRunIcon>
          </Tooltip>
        ))}
        <Tooltip title={"Paciente"}>
          <PersonPinCircleIcon
            fontSize="large"
            style={{
              color: "#FF5733",
              backgroundColor: "white",
              position: "absolute",
              left: ubicacion.x - 5,
              top: ubicacion.y - 5,
              borderRadius: "50%",
              zIndex: 999,
            }}
          ></PersonPinCircleIcon>
        </Tooltip>
      </div>
      <div className="p-8 mt-5 text-blue-600">
        <p className="">
          Actuador Cercano: <span className="font-bold">{cercania}</span>
        </p>

        <p className="">
          Luz Cercana:{" "}
          <span className="font-bold">
            {cercaniaLuces} 
            {/* Distancia: {distanciaLuces} */}
          </span>
        </p>

        {/* <p className="">
          distancia del actuador Cercano:{" "}
          <span className="font-bold">{distancia}</span>
        </p>

        <p>{JSON.stringify(lucesMQTT)}</p> */}
      </div>
    </>
  );
};

export default MapaActuadores;
