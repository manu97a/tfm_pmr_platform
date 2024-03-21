"use client";
import MapaActuadores from "@/components/MapaActuadores";
import Mapper from "@/components/Mapper";
import React, { useState, useEffect } from "react";

const Mapa = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isDataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    fetch("/api/actuadores/maping")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className="container mx-auto text-center">
      <h1>Ubicación de dispositivos</h1>
      {isDataLoaded && (<MapaActuadores/>)}
      
    </div>
  );
};

export default Mapa;
