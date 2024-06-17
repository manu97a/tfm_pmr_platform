"use client";
import React from "react";
import { useState, useEffect } from "react";
import { MdSensors } from "react-icons/md";
import Link from "next/link";

const ListaSensores = () => {
  const [sensores, setSensores] = useState([]);
  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const response = await fetch("api/sensores", {
          method: "GET",
        });
        const data = await response.json();
        setSensores(data);
      } catch (error) {
        console.log("Error al obtener todos los sensores", error);
      }
    };
    fetchSensores();
  }, []);
  const handleEliminarSensor = async (id) => {
    try {
      await fetch(`api/sensores/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log("Error al eliminar el sensor", error);
    }
  };
  const handleEliminarTodosLosSensores = async () => {
    try {
      const response = await fetch("api/sensores", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Todos los sensores han sido eliminados");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar los sensores", error);
      alert("Error al eliminar los sensores. Intenta nuevamente");
    }
  };
  return (
    <div className="container mx-auto rounded-xl m-8 text-center w-full bg-blue-600 text-white font-light p-8">
      <h3 className="text-3xl py-5">Lista de sensores</h3>
      <div className="container mx-auto text-center p-8">
        <Link
          href="/AgregarSensores"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Agregar nuevo sensor
        </Link>
        <button
          onClick={handleEliminarTodosLosSensores}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Eliminar todos
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {sensores.map((sensor, index) => (
          <div
            key={index}
            className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex flex-col items-center pb-10">
              <MdSensors
                className="w-24 h-24 mb-3 text-[#3F6CDF]"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {sensor.name}
              </h5>
              <span className="text-sm text-gray-500">Zona: {sensor.zone}</span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  href={`/EditarSensor/${sensor._id}`} 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleEliminarSensor(sensor._id)}
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaSensores;
