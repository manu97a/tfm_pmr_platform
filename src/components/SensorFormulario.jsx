"use client";
import React, { useState } from "react";

const SensorFormulario = (formData, forNewSensor = true) => {
  const [form, setForm] = useState({
    name: formData.name,
    minValue: formData.minValue,
    maxValue: formData.maxValue,
    zone: formData.zone,
  });
  const [message, setMessage] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewSensor) {
      postData(form);
    }else{
        //editar data
    }
  };
  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/sensor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setMessage((oldmessage) => [...oldmessage, { message: message }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-red-500">formulario mijita</h1>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <div className="p-3 mb-3">
            <label className="block text-blue-600 text-xl font-light mb-2">
              Nombre del Sensor
            </label>
            <input
              type="text"
              className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
              placeholder="s_humo"
              name="name"
              value={form.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className="p-3 mb-8">
            <label className="block text-blue-600 text-xl font-light mb-2">
              Valor Mínimo
            </label>
            <input
              type="number"
              className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
              placeholder="0"
              name="minValue"
              value={form.minValue}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-3 mb-8">
            <label className="block text-blue-600 text-xl font-light mb-2">
              Valor Máximo
            </label>
            <input
              type="number"
              className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
              placeholder="100"
              name="maxValue"
              value={form.maxValue}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-3 mb-8">
            <h3 className="block text-blue-600 text-xl font-light mb-2">
              Ubicación del sensor
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    type="radio"
                    id="dormitorio"
                    name="zone"
                    value="Dormitorio"
                    autoComplete="off"
                    checked={form.zone === "Dormitorio"}
                    onChange={handleChange}
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
                    autoComplete="off"
                    checked={form.zone === "Sala"}
                    onChange={handleChange}
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
                    autoComplete="off"
                    checked={form.zone === "Cocina"}
                    onChange={handleChange}
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
                    autoComplete="off"
                    checked={form.zone === "Baño"}
                    onChange={handleChange}
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
                    autoComplete="off"
                    checked={form.zone === "Pasillo Dormitorio"}
                    onChange={handleChange}
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
          <button
            type="submit"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            {forNewSensor ? 'Agregar Sensor': 'Editar Sensor'}
            
          </button>
          <p>{message}</p>
        </form>
      </div>
    </>
  );
};

export default SensorFormulario;
