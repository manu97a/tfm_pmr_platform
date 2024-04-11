"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
const EditarLuz = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const [dataActual, setDataActual] = useState({});
  const [coordenadas, setCoordenadas] = useState({ x: null, y: null });
  const imageWidth = 800;
  const imageHeight = 700;
  const [formData, setFormData] = useState({
    name: "",
    zone: "",
    xcoordinate: "",
    ycoordinate: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    // Obtener las coordenadas del clic
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    // Actualizar el estado con las coordenadas
    setCoordenadas({ x, y });
    setFormData({ ...formData, xcoordinate: x, ycoordinate: y });
  };
  useEffect(() => {
    const infoLuces = async () => {
      try {
        const response = await fetch(`/api/luces/${slug}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("No se pudo obtener la luz");
        }
        const data = await response.json();
        setDataActual(data);
      } catch (error) {
        console.log("Error al obtener esta luz", error);
      }
    };
    infoLuces();
  }, [slug]);
  const handleSubmit = (e) => {
    e.preventDefault();
    patchData(formData);
  };
  const patchData = async (form) => {
    try {
      console.log(form);
      const response = await fetch(`/api/luces/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("ERROR al editar esta luz");
      }
      const data = await response.json();
      console.log(data);
      setMessage(`Luz editada correctamente`);
      router.push("/ListaLuces");
    } catch (error) {
      console.log(error);
      setMessage(`Ocurrió un error al editar la luz `);
    }
  };
  return (
    <>
      <div className="container max-w-full mx-auto text-center bg-gray-50">
        <h3 className="text-blue-700 text-2xl p-5">Datos actuales de la luz</h3>
        <div className="grid lg:grid-cols-2 gap-4 p-5 md:grid-cols-2 sm:grid-cols-1">
          <div className="bg-gray-50 rounded-xl border border-blue-700">
            <p className="p-8">
              Nombre de la luz:{" "}
              <span className="font-bold ml-3">{dataActual.name}</span>
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl border border-blue-700">
            <p className="p-8">
              Ubicación de la luz:{" "}
              <span className="font-bold ml-3">{dataActual.zone}</span>
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl border border-blue-700">
            <p className="p-8">Coordenadas Actuales: </p>
            <div className="flex flex-col text-blue-600 p-4">
              <div>
                <p className="font-bold">
                  X:{" "}
                  <span className=" text-gray-500">
                    {dataActual.xcoordinate}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-bold">
                  Y:{" "}
                  <span className=" text-gray-500">
                    {dataActual.ycoordinate}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* FORMULARIO PARA EDITAR EL SENSOR */}
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            <div className="p-3 mb-3">
              <label className="block text-blue-600 text-xl font-light mb-2">
                Nombre de la luz
              </label>
              <input
                type="text"
                className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
                placeholder="LamparaCocina"
                name="name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-3 mb-8">
              <h3 className="block text-blue-600 text-xl font-light mb-2">
                Ubicación de la luz
              </h3>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="dormitorio"
                      name="zone"
                      value="Dormitorio"
                      checked={formData.zone === "Dormitorio"}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="dormitorio"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Dormitorio
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="sala"
                      name="zone"
                      value="Sala"
                      checked={formData.zone === "Sala"}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="sala"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Sala
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="cocina"
                      name="zone"
                      value="Cocina"
                      checked={formData.zone === "Cocina"}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="cocina"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Cocina
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="baño"
                      name="zone"
                      value="Baño"
                      checked={formData.zone === "Baño"}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="baño"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Baño
                    </label>
                  </div>
                </li>

                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="pasilloentrada"
                      name="zone"
                      value="Pasillo Entrada"
                      autoComplete="off"
                      checked={formData.zone === "Pasillo Entrada"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="pasilloentrada"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Pasillo entrada
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      type="radio"
                      id="pasillodormitorio"
                      name="zone"
                      value="Pasillo Dormitorio"
                      checked={formData.zone === "Pasillo Dormitorio"}
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="pasillodormitorio"
                      className="w-full py-3 ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                    >
                      Pasillo Dormitorio
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-blue-600 text-xl font-light mb-2">
              <p>Selecciona en el mapa la nueva ubicación</p>
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
                }} // Cambiar el cursor para indicar que es clickeable
              />
              {coordenadas.x !== null && coordenadas.y !== null && (
                <Lightbulb
                  size={25}
                  className="text-green-800"
                  style={{
                    position: "absolute",
                    left: coordenadas.x,
                    top: coordenadas.y,
                    zIndex: 999,
                  }}
                />
              )}
            </div>
            <div>
              <button
                type="submit"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Editar Luz
              </button>
              <p className="text-red-500">{message}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarLuz;
