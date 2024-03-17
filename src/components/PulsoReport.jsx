"use client";
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import Annotation from "chartjs-plugin-annotation";
import { LuAlertTriangle } from "react-icons/lu";
import Link from "next/link";
Chart.register(Annotation);
Chart.defaults.font.size = 20;
const PulsoReport = () => {
  const [pulsoData, setPulsoData] = useState([]);
  const [umbral, setUmbral] = useState([]);
  const [alertClasses, setAlertas] = useState([]);
  const chartRef = useRef(null);
  const [grafica, setGrafica] = useState(false);
  useEffect(() => {
    const fetchPulsoData = async () => {
      try {
        const data = await fetch(`api/simulation/salud/pulso`, {
          method: "GET",
        });
        const datos = await data.json();
        setPulsoData(datos);
      } catch (error) {
        console.log("Error datos para graficar", error);
      }
    };
    fetchPulsoData();
    const fetchUmbrales = async () => {
      try {
        const datos = await fetch(`/api/umbrales`, {
          method: "GET",
        });
        const listumbrales = await datos.json();
        if (Array.isArray(listumbrales) && listumbrales.length > 0) {
          // Accede al primer elemento del array y obtén el valor de "pulso"
          const umbralPulso = listumbrales[0].pulso;

          // Imprime el valor de umbralPulso para verificar
          console.log("Umbral de pulso:", umbralPulso);

          // Actualiza el estado o realiza otras operaciones según sea necesario
          setUmbral(umbralPulso);
          setGrafica(true);
        }
        console.log(umbralPulso);
        setUmbral(umbralPulso);
        setGrafica(true);
      } catch (error) {
        console.log("Error obteniendo umbral", error);
      }
    };
    fetchUmbrales();
  }, []);
  useEffect(() => {
    if (grafica) {
      var filtradoAlertas = pulsoData.filter((item) => item.value > umbral);
      setAlertas(filtradoAlertas);
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
            labels: pulsoData.map((data) => data.time),
            datasets: [
              {
                label: "Pulso",
                data: pulsoData.map((data) => data.value),
                borderColor: "#0000ff",
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
  }, [grafica, pulsoData]);

  return (
    <div className="w-[100%] p-8 font-bold">
      <div className="container text-center mx-auto mb-5 font-light text-2xl">
        <div className="p-3">
          <h3 className="mb-6 text-blue-600">Reporte de eventos del Pulso</h3>
          <p className="">
            Umbral: <span className="text-blue-600">{umbral}</span>
          </p>
        </div>
      </div>
      <canvas ref={chartRef} className="h-[700px] "></canvas>
      <div className="text-center p-8">
        <p className="p-8 font-light text-blue-600">
          Cantidad de alertas:{" "}
          <span className="font-bold bg-blue-200 p-2 rounded-xl">
            {alertClasses.length}
          </span>{" "}
        </p>
        <div className="p-8">
          <p className="mb-10 ms-6  m-2 text-blue-600">Reporte de alertas</p>
          <ol className="relative border-red-500">
            {alertClasses.map((dato, index) => (
              <li className="mb-10 ms-6" key={index}>
                <div className="items-center justify-between p-4 bg-white border border-red-600 rounded-lg shadow-sm sm:flex">
                  <span className="shadow-lg">
                    <LuAlertTriangle
                      className="mx-auto shadow-lg text-red-600"
                      size={20}
                    />
                  </span>
                  <time className="mb-1 text-xs font-bold text-black sm:order-last sm:mb-0">
                    <span className="text-gray-500 mr-5">Sucedió a las: </span>
                    {dato.time}
                  </time>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                    Valor registrado:{" "}
                    <span className="font-semibold text-red-600">
                      {dato.value}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      
      </div>
    </div>
  );
};

export default PulsoReport;
