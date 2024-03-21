import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const Mapper = () => {
  const [clickedCoords, setClickedCoords] = React.useState(null);

  const handleMapClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setClickedCoords({ x: offsetX, y: offsetY });
  };
  return (
    <>
      <div style={{ position: "relative", width: 700, height: 500 }}>
        <h1>Mapa</h1>
        <img
          src="/planocasa.png"
          alt="Mapa"
          style={{ width: "100%", height: "100%" }}
        />
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 800 }}
          width={700}
          height={500}
          style={{ position: "absolute", top: 0, left: 0 }}
          onClick={handleMapClick}
        >
          {/* Aquí puedes definir tus áreas personalizadas si es necesario */}
        </ComposableMap>
        {clickedCoords && (
          <div
            style={{
              position: "absolute",
              top: clickedCoords.y,
              left: clickedCoords.x,
            }}
          >
           
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "red",
              }}
            ></div>
          </div>
        )}
      </div>
      {clickedCoords && (
        <div className="container mx-auto p-8 font-bold">
          <p className="text-blue-600">Coordenadas: {clickedCoords.x},{clickedCoords.y}</p>
        
        </div>
      )}
    </>
  );
};

export default Mapper;
