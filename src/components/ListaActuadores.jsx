"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiPowerFill } from "react-icons/pi";
const ListaActuadores = () => {
  const [actuadores, setActuadores] = useState([]);
  useEffect(() => {
    const fetchActuadores = async () => {
      try {
        const response = await fetch("api/actuadores", {
          method: "GET",
        });
        const data = await response.json();
        setActuadores(data);
      } catch (error) {
        console.log("Error al obtener todos los actuadores", error);
      }
    };
    fetchActuadores();
  }, []);
  const handleEliminarActuador = async (id) => {
    try {
      await fetch(`api/actuadores/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log("Error al eliminar el actuador", error);
    }
  };

  return (
    <div className="container max-w-full mx-auto text-center">
      <h2 className="text-center font-light text-xl p-8 text-blue-500">
        Lista de Actuadores
      </h2>
      <Link
          href="/AgregarActuador"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Agregar nuevo actuador
        </Link>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8 place-items-center">
        {actuadores.map((actuador, index) => (
          <div
            key={index}
            className={`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow`}
          >
            <div class="flex justify-end"></div>
            <div class="flex flex-col items-center p-8">
              <p className="p-8">
                <PiPowerFill size={70} className="text-[#228B22]" />
              </p>
              <h3 class="mb-1 text-xl font-light text-gray-900">
                {actuador.name}
              </h3>
              <h3 className="text-black">
                Ubicación:{" "}
                <span class="text-sm text-gray-500">{actuador.zone}</span>
              </h3>
              <div className="flex mt-4 md:mt-6">
              <Link
                href={`/EditarActuador/${actuador._id}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Editar
              </Link>

              <button onClick={()=> handleEliminarActuador(actuador._id)} 
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
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

export default ListaActuadores;
