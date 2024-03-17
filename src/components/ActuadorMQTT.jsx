// "use client";
// import React, { useEffect, useState } from "react";
// import mqtt from "mqtt";

// const ActuadorMQTT = () => {
//   const [actuadores, setActuadores] = useState([]);
//   const [botones, setBotones] = useState([]);
//   useEffect(() => {
//     const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
//     client.on("connect", () => {
//       console.log("Obteniendo estado de dispositivos");
//       client.subscribe("TFM_actuadores");
//     });
//     client.on("message", (topic, message) => {
//       let messageString = message.toString();
//       messageString = messageString.replace(/'/g, '"');
//       const parsedMessage = JSON.parse(messageString);
//       console.log("Estado Actuadores recibidos:", parsedMessage); // Registrar los datos recibidos
//       setActuadores(parsedMessage);
//     });
//     return () => {
//       client.end();
//     };
//   }, []);

//   const handleToggle = (nombreActuador, valorActual) =>{
//     const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
//     client.on("connect", () => {
//       client.subscribe("TFM_actuadores");
//     });
//     if  (valorActual == 0){

//         const estado = 1;
//         const actualidad = JSON.stringify({
//             ...actuadores,
//             [nombreActuador] : estado,
//         })
//         client.publish("TFM_actuadores", actualidad)
//         console.log(actualidad)
//     }else{
//         const estado = 0;
//         const actualidad = JSON.stringify({
//             ...actuadores,
//             [nombreActuador] : estado,
//         })
//         client.publish("TFM_actuadores", actualidad)
//         console.log(actualidad)

//     }
//   }

//   return (
//     <div>
//       <div>
//         <h2>Estado de los actuadores</h2>
//         <ul>
//           {Object.entries(actuadores).map(([nombre, valor]) => (
//             <li key={nombre}>
//               <strong>{nombre}:</strong> {valor}
//               <button onClick={()=>handleToggle(nombre,valor)} className="text-red-500">
//                 Botonsillo
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ActuadorMQTT;
