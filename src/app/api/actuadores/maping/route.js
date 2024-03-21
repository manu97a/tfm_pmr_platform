import { NextResponse } from "next/server";
import conexionDB from "../../../../../lib/dbConnect";
import Actuadores from "../../../../../models/Actuadores";

export async function GET() {
    await conexionDB();
    const actuadores = await Actuadores.find();
    const transformedData = actuadores.map((item) => {
      const x = parseFloat(item.xcoordinate);
      const y = parseFloat(item.ycoordinate);
      return {
        id: item._id,
        name: item.name,
        shape: "circle",
        fillColor: "#eab54d4d",
        strokeColor: "black",
        coords: [x,y,5],
        zone: item.zone,
      };
    });
    const finalData = {
      name: "prueba",
      areas: transformedData,
    }
    createJSONFile(finalData)
    return NextResponse.json(finalData);
  }
  async function createJSONFile(data) {
    const actuadores = data;
  
    const jsonData = JSON.stringify(actuadores, null);
  
    const fs = require("fs");
    fs.writeFile("map.json", jsonData, (err) => {
      if (err) {
        console.error("Error al escribir el archivo JSON:", err);
      } else {
        console.log("Archivo JSON creado exitosamente!");
      }
    });
  }