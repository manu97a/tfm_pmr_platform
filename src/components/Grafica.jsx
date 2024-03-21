import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import Annotation from "chartjs-plugin-annotation";
import HistoricAlerts from "./HistoricAlerts";
import zoomPlugin from "chartjs-plugin-zoom";

import Link from "next/link";
Chart.register(Annotation);
Chart.register(zoomPlugin);
Chart.defaults.font.size = 10;
const Grafica = ({ sensorName }) => {
  const [sensorData, setSensorData] = useState([]);
  const [alertEvents, setAlertEvents] = useState([]);
  const [grafica, setGrafica] = useState(false);
  const [umbral, setUmbral] = useState(null);
  const chartRef = useRef(null);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  let myChart;
  useEffect(() => {
    if (sensorName === "") return;
    if (sensorName !== null) {
      const fetchData = async () => {
        try {
          const data = await fetch(`api/simulation/sensors/${sensorName}`, {
            method: "GET",
          });
          const simulateddata = await data.json();
          setSensorData(simulateddata);
        } catch (error) {
          console.log("Error datos para graficar", error);
        }
      };
      fetchData();
      const fetchUmbrales = async () => {
        try {
          const data = await fetch(`api/sensores/alerts`, {
            method: "GET",
          });
          const list = await data.json();
          const sensor = list.find((sensor) => sensor.name === sensorName);

          if (sensor) {
            console.log(sensor);
            setUmbral(sensor.umbral);
            setGrafica(true);
          }
        } catch (error) {
          console.log("Error obteniendo umbral", error);
        }
      };
      fetchUmbrales();
    }
  }, []);
  useEffect(() => {
    if (grafica) {
      var filterAlerts = sensorData.filter((item) => item.value > umbral);
      setAlertEvents(filterAlerts);
      const color = getRandomColor();
      const ctx = chartRef.current.getContext("2d");
      if (chartRef.current) {
        if (Chart.controllers) {
          Chart.register(...Chart.controllers);
        }
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        chartRef.current.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: sensorData.map((data) => data.time),
            datasets: [
              {
                label: sensorName,
                data: sensorData.map((data) => data.value),
                borderColor: color,
                tension: 0.3,
              },
            ],
          },
          options: {
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                },
              },
            },
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "x", // Enable both horizontal and vertical zooming
                },
                pan: {
                  enabled: true,
                  mode: "x", // Enable both horizontal and vertical panning
                },
              },
              annotation: {
                annotations: {
                  line1: {
                    type: "line",
                    mode: "horizontal",
                    scaleID: "y",
                    value: umbral,
                    borderColor: "red",
                    borderWidth: 3,
                  },
                  type: "label",
                  xScaleID: "x",
                  xValue: 0,
                  yScaleID: "y",
                  yValue: umbral,
                },
              },
            },
          },
        });
      }
    }
  }, [grafica, sensorData]);
  return (
    <div className="w-[100%] p-8 font-bold">
      <div className="container text-center mx-auto mb-5 font-light text-2xl">
        <div className="p-3">
          <h3 className="mb-6">
            Datos leídos por el sensor:{" "}
            <span className="text-blue-600">{sensorName}</span>
          </h3>
          <p className="">
            Umbral del sensor: <span className="text-blue-600">{umbral}</span>
          </p>
        </div>
      </div>

      <canvas ref={chartRef} className="h-[700px] "></canvas>

      <div className="text-center p-8">
        <p className="mb-10 ms-6 font-light text-blue-600">
          Cantidad de alertas sensor {sensorName}:{" "}
          <span className="font-bold bg-blue-200 p-2 rounded-xl">
            {alertEvents.length}
          </span>{" "}
        </p>

        <HistoricAlerts datos={alertEvents} sensorName={sensorName} />
      </div>
    </div>
  );
};

export default Grafica;

// import React, { useEffect, useState, useRef } from "react";
// import Dygraph from "dygraphs";
// import HistoricAlerts from "./HistoricAlerts";
// import Link from "next/link";

// const Grafica = ({ sensorName }) => {
//   const [sensorData, setSensorData] = useState([]);
//   const [alertEvents, setAlertEvents] = useState([]);
//   const [grafica, setGrafica] = useState(false);
//   const [umbral, setUmbral] = useState(null);
//   const chartRef = useRef(null);
//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };
//   let myChart;
//   useEffect(() => {
//     if (sensorName === "") return;
//     if (sensorName !== null) {
//       const fetchData = async () => {
//         try {
//           const data = await fetch(`api/simulation/sensors/${sensorName}`, {
//             method: "GET",
//           });
//           const simulateddata = await data.json();
//           setSensorData(simulateddata);
//         } catch (error) {
//           console.log("Error datos para graficar", error);
//         }
//       };
//       fetchData();
//       const fetchUmbrales = async () => {
//         try {
//           const data = await fetch(`api/sensores/alerts`, {
//             method: "GET",
//           });
//           const list = await data.json();
//           const sensor = list.find((sensor) => sensor.name === sensorName);

//           if (sensor) {
//             console.log(sensor);
//             setUmbral(sensor.umbral);
//             setGrafica(true);
//           }
//         } catch (error) {
//           console.log("Error obteniendo umbral", error);
//         }
//       };
//       fetchUmbrales();
//     }
//   }, []);
//   useEffect(() => {
//     if (grafica) {
//       var filterAlerts = sensorData.filter((item) => item.value > umbral);
//       setAlertEvents(filterAlerts);
//       function legendFormatter(data) {
//         if (data.x == null) {
//           // This happens when there's no selection and {legend: 'always'} is set.
//           return +data.series
//             .map(function (series) {
//               return series.dashHTML + " " + series.labelHTML;
//             })
//             .join();
//         }

//         var html = "<b>" + data.xHTML + "</b>";
//         data.series.forEach((series) => {
//           if (!series.isVisible) return;

//           var labeledData = series.labelHTML + " <b>" + series.yHTML + "</b>";

//           if (series.isHighlighted) {
//             labeledData = "<b>" + labeledData + "</b>";
//           }

//           html +=
//             "<div class='dygraph-legend-row'>" +
//             series.dashHTML +
//             "<div>" +
//             labeledData +
//             "</div></div>";
//         });
//         return html;
//       }
//       if (chartRef.current) {
//         const labels = sensorData.map((data) => new Date(data.time));
//         const values = sensorData.map((data) => data.value);
//         const data = labels.map((label, index) => [label, values[index]]);
//         const options = {
//           showRangeSelector: true,
//           labels: ["Tiempo", sensorName],
//           legendFormatter: legendFormatter,
//           legend: "follow",
//           strokeWidth: 2,
//           drawPoints: true,
//           pointSize: 4,
//           highlightCircleSize: 6,
//           highlightSeriesOpts: {
//             strokeWidth: 3,
//             strokeBorderWidth: 1,
//             highlightCircleSize: 8,
//           },
//           rollPeriod: 25,
//           rangeSelectorHeight: 50,
//           rangeSelectorPlotStrokeColor: "blue",
//           rangeSelectorPlotFillColor: "#FA8072",
//         };
     
//         const g = new Dygraph(chartRef.current, data, options, );
//       }
//     }
//   }, [grafica, sensorData]);
//   return (
//     <div className="p-8 font-bold">
//       <div className="container text-center mx-auto mb-5 font-light text-2xl">
//         <div className="p-3">
//           <h3 className="mb-6">
//             Datos leídos por el sensor:{" "}
//             <span className="text-blue-600">{sensorName}</span>
//           </h3>
//           <p className="">
//             Umbral del sensor: <span className="text-blue-600">{umbral}</span>
//           </p>
//         </div>
//       </div>
//       <div className="container ">
//         <div ref={chartRef}></div>
//       </div>

//       <div className="text-center p-8">
//         <p className="mb-10 ms-6 font-light text-blue-600">
//           Cantidad de alertas sensor {sensorName}:{" "}
//           <span className="font-bold bg-blue-200 p-2 rounded-xl">
//             {alertEvents.length}
//           </span>{" "}
//         </p>

//         <HistoricAlerts datos={alertEvents} sensorName={sensorName} />
//       </div>
//     </div>
//   );
// };

// export default Grafica;
