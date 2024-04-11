"use client";
import React, { useState, useEffect } from "react";
import RoomIcon from "@mui/icons-material/Room";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";

const SetSimulation = () => {
  const [coordenadas, setCoordenadas] = useState([]);
  const [nextId, setNextId] = useState(0); // Para asignar identificadores únicos a los círculos
  const imageWidth = 800;
  const imageHeight = 700;
  const [orden, setOrden] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const router = useRouter();
  const borrarBoton = () => {
    setCoordenadas([]);
    setSeleccionados([]);
    setNextId(0);
  };
  const clickSendButton = () => {
    const readyData = prepareData(coordenadas);
    handleClickEnviar(readyData);
  };
  const prepareData = (data) => {
    return data.map((item) => {
      return { _id: item.id, x: item.x, y: item.y };
    });
  };
  const handleClickEnviar = async (coordenadas) => {
    try {
      console.log(coordenadas);
      const response = await fetch("/api/coordenadas", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(coordenadas),
      });
      if (!response.ok) {
        throw new Error("ERROR al agregar coordendas");
      }
      setMensajeExito("Coordenadas agregadas correctamente");
      setTimeout(() => {
        router.push("/Mapa");
      }, 1000);
      const dataLuz = await response.json();
      console.log(dataLuz);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;
    const clickedCircle = coordenadas.find((circle) => {
      const dx = circle.x - x;
      const dy = circle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= 5;
    });
    if (clickedCircle) {
      const newCoordenadas = coordenadas.filter(
        (circle) => circle.id !== clickedCircle.id
      );
      newCoordenadas.forEach((circle, index) => {
        circle.id = index;
      });
      setCoordenadas(newCoordenadas);
      console.log(coordenadas);
      setNextId(newCoordenadas.length);
    } else {
      const newCoordenadas = [...coordenadas, { id: nextId, x, y }];
      const newOrden = [...orden, nextId];

      setCoordenadas(newCoordenadas);
      console.log(newCoordenadas);
      setOrden(newOrden);

      setNextId((prevId) => prevId + 1);
      //   enviarCoordenada(x, y);
    }
  };
  useEffect(() => {
    if (coordenadas.length === 0) {
      setNextId(0);
    }
  }, [coordenadas]);
  return (
    <div>
      <h2 className="text-center font-light text-xl p-8 text-blue-500">
        Seleccione las coordenadas de la ruta
      </h2>
      <h2 className="text-center font-light text-xl p-8 text-blue-500">
        Selecciona en la imagen la ruta que seguirá la simulación
      </h2>
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
        {/* Renderizar todos los círculos */}
        {coordenadas.map((circle) => (
          <Tooltip
            key={circle.id}
            title={circle.id}
            placement="top"
            onClick={() =>
              setCoordenadas((prevCoordenadas) =>
                prevCoordenadas.filter((c) => c.id !== circle.id)
              )
            }
          >
            <RoomIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundColor: "#0077FF",
                padding: "5px",
                position: "absolute",
                left: circle.x, // Adjust positioning as needed
                top: circle.y,
                borderRadius: "50%",
                zIndex: 999,
              }}
            ></RoomIcon>
          </Tooltip>
        ))}
      </div>

      <div class="grid grid-cols-2 gap-2 p-8">
        <div>
          <button
            onClick={borrarBoton}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Eliminar coordenadas
          </button>
        </div>

        <div>
          <button
            onClick={clickSendButton}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Enviar coordenadas
          </button>
        </div>
      </div>

      <div className="text-red-500">
        {mensajeExito && <p>{mensajeExito}</p>}
      </div>

      <div className="p-8 mt-5 text-blue-600">
        <p className="font-bold">Coordenadas:</p>
        <ol>
          {coordenadas.map((circle) => (
            <li key={circle.id}>
              <p>id {circle.id} </p>({circle.x}, {circle.y})
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SetSimulation;
