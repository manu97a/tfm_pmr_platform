"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { PiPowerFill } from "react-icons/pi";
import { MdSensors } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const PerfilSimple = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const [perfil, setPerfil] = useState(null);
  const imageWidth = 800;
  const imageHeight = 700;
  useEffect(() => {
    const fetchPerfilSimple = async () => {
      try {
        const response = await fetch(`/api/perfiles/${slug}`);
        if (!response.ok) {
          throw new Error("Error al cargar el perfil");
        }
        const data = await response.json();
        setPerfil(data);
      } catch (error) {
        console.error(error);
        setPerfil(null);
      }
    };

    if (slug) {
      fetchPerfilSimple();
    }
  }, [slug]);
  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container bg-white border border-blue-700 drop-shadow-xl rounded-xl p-8">
      <h2 className="text-blue-700 text-3xl font-light text-center">
        Detalles del Perfil: <span className="font-bold">{perfil.name}</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-items-center">
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-sm shadow-blue-700/50 rounded-xl w-96">
          <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white flex justify-center items-center">
            <LuLightbulb size={150} className="text-blue-700" />
          </div>
          <div class="p-6">
            <h5 class="text-blue-700 block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Luces
            </h5>
            <p class="block  text-base antialiased font-light leading-relaxed text-inherit">
              {perfil.luzs.map((luz) => (
                <li key={luz._id.$oid}>{luz.name}</li>
              ))}
            </p>
          </div>
        </div>
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-sm shadow-blue-700/50 rounded-xl w-96">
          <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white flex justify-center items-center">
            <MdSensors size={150} className="text-blue-700" />
          </div>
          <div class="p-6">
            <h5 class=" text-blue-700 block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Sensores
            </h5>
            <p class="block  text-base antialiased font-light leading-relaxed text-inherit">
              {perfil.sensors.map((luz) => (
                <li key={luz._id.$oid}>{luz.name}</li>
              ))}
            </p>
          </div>
        </div>
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-sm shadow-blue-700/50 rounded-xl w-96">
          <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white flex justify-center items-center">
            <PiPowerFill size={150} className="text-blue-700" />
          </div>
          <div class="p-6">
            <h5 class="text-blue-700 block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Actuadores
            </h5>
            <p class="block text-base antialiased font-light leading-relaxed text-inherit">
              {perfil.actuadores.map((luz) => (
                <li key={luz._id.$oid}>{luz.name}</li>
              ))}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-blue-700 text-3xl font-light text-center p-8">
        Ruta predefinida
      </h2>
      <div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src="/planocasa.png"
            alt="Imagen"
            style={{
              cursor: "crosshair",
              width: imageWidth,
              height: imageHeight,
            }}
          />

          {perfil.coordenadas.map((coordenada, index) => (
            <Tooltip key={index} title={coordenada._id} placement="top">
              <DirectionsRunIcon
                fontSize="large"
                style={{
                  color: "white",
                  backgroundColor: "#298816",
                  padding: "5px",
                  position: "absolute",
                  left: coordenada.x,
                  top: coordenada.y,
                  borderRadius: "50%",
                  zIndex: 999,
                }}
              ></DirectionsRunIcon>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfilSimple;
