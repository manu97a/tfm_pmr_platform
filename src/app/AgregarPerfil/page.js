"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const AgregarPerfil = () => {
  const [nombre, setNombre] = useState('')
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch("/api/perfiles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({name: nombre}),
      });
      if (!response.ok) {
        router.push("/AgregarPerfil");
        setMessage(response);
      }
      const result = await response.json();
      console.log(result);
      setMessage(`Se ha registrado el perfil correctamente`);
      
    } catch (error) {
      console.log(error);
      setMessage(`Ocurrió un error al agregar este perfil `);
    }
  };
  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <div className="p-3 mb-3">
          <label className="block text-blue-600 text-xl font-light mb-2">
            Nombre del perfil a agregar
          </label>
          <input
            type="text"
            className="w-[300px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-50 font-light text-black"
            placeholder="Perfil de prueba"
            name="name"
            autoComplete="off"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Agregar Perfil
        </button>
        <p className="text-red-500">{message}</p>
      </form>
    </div>
  )
}

export default AgregarPerfil