"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import mqtt from "mqtt";

import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";

const ListaLuces = () => {
  const [loading, setLoading] = useState(true);
  const [luces, setLuces] = useState([]);
  const [lucesMQTT, setLucesMQTT] = useState([]);

  useEffect(() => {
    const fetchLuces = async () => {
      try {
        const response = await fetch("api/luces", {
          method: "GET",
        });
        const data = await response.json();
        setLuces(data);
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener todas las luces", error);
      }
    };
    fetchLuces();
  }, []);
  const handleEliminarLuz = async (id) => {
    try {
      await fetch(`api/luces/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log("Error al eliminar la luz", error);
    }
  };
  const handleEliminarTodos = async () => {
    try {
      const response = await fetch("api/luces", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Todos las luces han sido eliminadas");
        window.location.reload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar las luces", error);
      alert("Error al eliminar las luces. Intenta nuevamente");
    }
  };
  useEffect(() => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      console.log("Obteniendo estado de dispositivos");
      client.subscribe("TFM_luces");
    });
    client.on("message", (topic, message) => {
      let messageString = message.toString();
      messageString = messageString.replace(/'/g, '"');
      const parsedMessage = JSON.parse(messageString);
      console.log("Estado Luces recibidos:", parsedMessage);
      setLucesMQTT(parsedMessage);
    });
    return () => {
      client.end();
    };
  }, []);
  const handleToggle = (nombreLuz, valorActual) => {
    const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
    client.on("connect", () => {
      client.subscribe("TFM_luces");
    });
    if (valorActual == 0) {
      const estado = 1;
      const actualidad = JSON.stringify({
        ...lucesMQTT,
        [nombreLuz]: estado,
      });
      client.publish("TFM_luces", actualidad);
      console.log(actualidad);
    } else {
      const estado = 0;
      const actualidad = JSON.stringify({
        ...lucesMQTT,
        [nombreLuz]: estado,
      });
      client.publish("TFM_luces", actualidad);
      console.log(actualidad);
    }
  };

  const getIcon = (value) => {
    if (typeof value === "number" && !isNaN(value)) {
      return value === 1 ? (
        <LuLightbulb size={70} className="text-[#228B22]" />
      ) : (
        <LuLightbulbOff size={70} className="text-red-500" />
      );
    } else {
      return (
        <div role="status">
          <LuLightbulb size={70} className="text-gray-600 opacity-50" />
          {/* <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span> */}
        </div>
      );
    }
  };
  return (
    <div className="container max-w-full mx-auto text-center">
      <h2 className="text-center font-light text-xl p-8 text-blue-500">
        Lista de Luces
      </h2>
      {loading && (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <>
          <Link
            href="/AgregarLuz"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Agregar nueva Luz
          </Link>
          <button
            onClick={handleEliminarTodos}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Eliminar todos
          </button>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8 place-items-center">
            {luces.map((luz, index) => (
              <div
                key={index}
                className={`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow`}
              >
                <div className="flex justify-end"></div>
                <div className="flex flex-col items-center p-8">
                  <p
                    className="p-8 cursor-pointer"
                    onClick={() => handleToggle(luz.name, lucesMQTT[luz.name])}
                  >
                    {getIcon(lucesMQTT[luz.name])}
                  </p>
                  <h3 className="text-black">{luz.name}</h3>

                  <h3 className="text-black">
                    Ubicación:{" "}
                    <span class="text-sm text-gray-500">{luz.zone}</span>
                  </h3>
                  <div className="flex mt-4 md:mt-6">
                    <Link
                      href={`/EditarLuz/${luz._id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => handleEliminarLuz(luz._id)}
                      className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListaLuces;
