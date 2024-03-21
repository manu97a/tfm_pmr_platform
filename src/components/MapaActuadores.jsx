// import React, { useState, useEffect } from "react";
// import Icon from "@mui/material/Icon";
// import HomeIcon from "@mui/icons-material/Home";
// import Tooltip from "@mui/material/Tooltip";
// const MapaActuadores = () => {
//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   const imageWidth = 800;
//   const imageHeight = 700;
//   useEffect(() => {
//     fetch("/api/actuadores")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       });
//   }, []);
//   if (isLoading) return <p>Loading...</p>;
//   if (!data) return <p>No profile data</p>;
//   return (
//     <>
//       <div style={{ position: "relative", display: "inline-block" }}>
//         <img
//           src="/planocasa.png"
//           alt="Imagen"
//           style={{
//             cursor: "crosshair",
//             width: imageWidth,
//             height: imageHeight,
//           }}
//         />
//         {data.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               left: item.xcoordinate - 5,
//               top: item.ycoordinate - 5,
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "red",
//               zIndex: 999,
//             }}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// export default MapaActuadores;

import React, { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import HomeIcon from "@mui/icons-material/Home";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import Tooltip from "@mui/material/Tooltip";
const MapaActuadores = () => {
  const [coordenadas, setCoordenadas] = useState({ x: null, y: null });
  
  const handleClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    // Obtener las coordenadas del clic
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    setCoordenadas({ x, y });
  };
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const imageWidth = 800;
  const imageHeight = 700;
  useEffect(() => {
    fetch("/api/actuadores")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src="/planocasa.png"
          alt="Imagen"
          onClick={handleClick}
          style={{
            cursor: "crosshair",
            width: imageWidth,
            height: imageHeight,
          }}
        />
        {data.map((item, index) => (
          <Tooltip key={index} title={item.name} placement="top">
            <SettingsRemoteIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundColor: "#0077FF",
                padding: "5px",
                position: "absolute",
                left: item.xcoordinate, // Adjust positioning as needed
                top: item.ycoordinate,
                borderRadius: "50%",
                zIndex: 999,
              }}
            >
              <svg style={{ fill: "white" }}>
                <use xlinkHref="#settings-remote" />
              </svg>
            </SettingsRemoteIcon>
          </Tooltip>
        ))}
      </div>
      <div className="p-8 mt-5 text-blue-600">
          <p className="font-bold">
            {" "}
            Coordenadas:
            {coordenadas.x}, {coordenadas.y}
          </p>
        </div>
    </>
  );
};

export default MapaActuadores;
