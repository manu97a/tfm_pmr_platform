"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ActuadorFormulario = () => {
  const router = useRouter();
  const [imgCoords, setImgCoords] = React.useState(0);
  const [clickedCoords, setClickedCoords] = React.useState(null);

  const [coordenadas, setCoordenadas] = useState({ x: null, y: null });
  const imageWidth = 800;
  const imageHeight = 700;
  const handleClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    // Obtener las coordenadas del clic
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    // Actualizar el estado con las coordenadas
    setCoordenadas({ x, y });
    setForm({ ...form, xcoordinate: x, ycoordinate: y });
  };
  const [form, setForm] = useState({
    name: "",
    zone: "",
    xcoordinate: "",
    ycoordinate: "",
  });
  // Mensaje de verificacion
  const [message, setMessage] = useState("");
  // Validacion formulario
  const [validate, setValidate] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    postData(form);
  };
  const postData = async (form) => {
    try {
      console.log(form);
      const response = await fetch("/api/actuadores", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("ERROR al agregar este actuador");
      }
      const dataSensor = await response.json();
      console.log(dataSensor);
      setMessage(`Se ha registrado el actuador correctamente`);

      router.push("/ListaActuadores");
    } catch (error) {
      console.log(error);
      setMessage(`Ocurrió un error al agregar el actuador `);
    }
  };
  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <div className="p-3 mb-3">
          <label className="block text-blue-600 text-xl font-light mb-2">
            Nombre del Actuador
          </label>
          <input
            type="text"
            className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
            placeholder="cocina"
            name="name"
            autoComplete="off"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        {validate && <p className="text-red-500 font-bold">{validate}</p>}
        <div className="p-3 mb-8">
          <h3 className="block text-blue-600 text-xl font-light mb-2">
            Ubicación del actuador
          </h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  type="radio"
                  id="dormitorio"
                  name="zone"
                  value="Dormitorio"
                  checked={form.zone === "Dormitorio"}
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
                  checked={form.zone === "Sala"}
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
                  checked={form.zone === "Cocina"}
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
                  checked={form.zone === "Baño"}
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
                  checked={form.zone === "Pasillo Entrada"}
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
                  checked={form.zone === "Pasillo Dormitorio"}
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
        <h3 className="block text-blue-600 text-xl font-light mb-2">
          Ubica en el mapa tu actuador, haz click en donde está ubicado:
        </h3>

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
            <div
              style={{
                position: "absolute",
                left: coordenadas.x, // Ajusta el desplazamiento para que el círculo esté centrado
                top: coordenadas.y, // Ajusta el desplazamiento para que el círculo esté centrado
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "red",
                zIndex: 999, // Asegura que el círculo esté por encima de la imagen
              }}
            />
          )}
        </div>

        <div className="p-8 mt-5 text-blue-600">
          <p className="font-bold">
            {" "}
            Coordenadas:
            {form.xcoordinate}, {form.ycoordinate}
          </p>
        </div>
        <button
          type="submit"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Agregar Actuador
        </button>
        <p className="text-red-500">{message}</p>
      </form>
    </div>
  );
};

export default ActuadorFormulario;
