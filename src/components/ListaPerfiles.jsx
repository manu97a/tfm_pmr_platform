"use client";
import React, { useEffect, useState } from "react";
import { BsPersonVcardFill } from "react-icons/bs";
import Link from "next/link";

const ListaPerfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singlePerfil, setSinglePerfil] = useState([]);

  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const response = await fetch("api/perfiles", {
          method: "GET",
        });
        const data = await response.json();
        setPerfiles(data);
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener todas los perfiles", error);
      }
    };
    fetchPerfiles();
  }, []);
  const handleEliminarPerfil = async (idtodelete) => {
    try {
      await fetch(`api/perfiles/${idtodelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.log("Error al eliminar este perfil", error);
    }
  };
  const fetchPerfilSimple = async (id) => {
    try {
      const response = await fetch(`/api/perfiles/${id}`);
      if (!response.ok) {
        throw new Error("Error al cargar el perfil");
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error);
    }
  };
  const handleUsarPerfil = async (idPerfil) => {
    try {
      const perfilData = await fetchPerfilSimple(idPerfil);
      if(!perfilData){
        alert('No se puede cargar el perfil')
        return
      }
      console.log('Perfil: ', perfilData)
      const sensorData = perfilData.sensors.map(sensor => ({
        ...sensor,
        _id: sensor._id  // Asegurarse de que el _id está presente
      }));
      const actuadorData = perfilData.actuadores.map(actuador => ({
        ...actuador,
        _id: actuador._id
      }))
      const coordenadasData = perfilData.coordenadas.map(coordenada => ({
        ...coordenada,
        _id: coordenada._id
      }))
      const lucesData = perfilData.luzs.map(luzsimple => ({
        ...luzsimple,
        _id: luzsimple._id
      }))
  
      
      const response = await fetch("api/uploadPerfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sensors: sensorData,
          actuadores: actuadorData,
          coordenadas: coordenadasData,
          luces: lucesData,
        }),
      });
      const data = await response.json()
      console.log('Response data', data)
      if (response.ok){
        alert('Perfil cargado correctamente')
        window.location.reload();
      }else{
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('error al cargar el perfil', error)
      alert('Error al cargar el perfil. Intenta nuevamente')
    }
  };

  return (
    <div className="p-3">
      <div className="container max-w-full mx-auto text-center">
        {loading && (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <h2 className="text-center font-light text-3xl p-8 text-blue-500">
              Perfiles
            </h2>
            <div className="container mx-auto text-center p-8">
              <Link
                href="/AgregarPerfil"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Guardar nuevo perfil
              </Link>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8 place-items-center">
              {perfiles.map((perfil, index) => (
                <div
                  key={index}
                  className={`w-full max-w-sm bg-white border border-blue-700 rounded-lg shadow`}
                >
                  <div className="flex justify-end"></div>
                  <div className="flex flex-col items-center p-8">
                    <div className="p-8 cursor-pointer">
                      <BsPersonVcardFill size={70} className="text-blue-700" />
                    </div>

                    <h3 className="text-blue-700 mb-1 text-xl font-medium">
                      {perfil.name}
                    </h3>

                    <div className="flex mt-4 md:mt-6">
                      <Link
                        href={`PerfilesSimulacion/${perfil._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Detalle
                      </Link>

                      <button
                        onClick={() => handleEliminarPerfil(perfil._id)}
                        className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleUsarPerfil(perfil._id)}
                        className="inline-flex items-center ms-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaPerfiles;
