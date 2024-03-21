"use client";
import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";

const Mapadelacasa = () => {
  const [actuadores, setActuadores] = useState([]);
  const [mapa, setMapa] = useState(null);
  const [imgCoords, setImgCoords] = useState("");

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

  useEffect(() => {
    if (actuadores.length > 0) {
      const transformedData = actuadores.map((item) => {
        console.log(typeof item.xcoordinate,item.xcoordinate )                         
        console.log(typeof item.ycoordinate,item.ycoordinate )                         
        const x = item.xcoordinate;
        const y = item.ycoordinate;
        const vec = [x,y,5]
        if (isNaN(x) || isNaN(y)) {
          // Si las coordenadas no son números válidos, no agregar este actuador
          return null;
        }
        return {
          name: item.name,
          shape: "circle",
          coords: vec, // x, y, radio
          preFillColor: "red",
        };
      }).filter(Boolean); // Filtra los elementos nulos generados en caso de coordenadas inválidas
  
      setMapa({ name: "actuadores", areas: transformedData });
    }
  }, [actuadores]);

  return (
    <div>
      {mapa ? (
        <ImageMapper
          src="/planocasa.png"
          width={700}
          map={mapa}
          onImageClick={(evt) =>
            setImgCoords("" + evt.pageX + ", " + evt.pageY)
          }
        />
      ) : (
        <p>Cargando mapa...</p>
      )}
      <p>{imgCoords}</p>
    </div>
  );
};

export default Mapadelacasa;
