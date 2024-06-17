import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.URIMONGO);

export async function POST(req) {
  try {
    const datos = await req.json();
    console.log("Datos recibidos en el servidor: ", datos);
    if (!datos.sensors || !Array.isArray(datos.sensors)) {
      throw new Error("Formato de sensores inválido");
    }
    if (!datos.actuadores || !Array.isArray(datos.actuadores)) {
      throw new Error("Formato de datos inválido para actuadores");
    }
    if (!datos.coordenadas || !Array.isArray(datos.coordenadas)) {
      throw new Error("Formato de datos inválido para coordenadas");
    }
    if (!datos.luces || !Array.isArray(datos.luces)) {
      throw new Error("Formato de datos inválido para luces");
    }

    await client.connect();
    const db = client.db("platformtfm");
    // Eliminar datos anteriores
    await db.collection("sensors").deleteMany({});
    await db.collection("actuadors").deleteMany({});
    await db.collection("coordenadas").deleteMany({});
    await db.collection("luzs").deleteMany({});
    // insertar sensores desde perfil
    const sensorData = datos.sensors.map((sensor) => ({
      ...sensor,
      _id: new ObjectId(sensor._id), // Convertir ID a ObjectId
    }));
    // insertar actuadores desde perfil
    const actuadoresData = datos.actuadores.map((actuador) => ({
      ...actuador,
      _id: new ObjectId(actuador._id),
    }));
    const lucesData = datos.luces.map((luzsimple) => ({
      ...luzsimple,
      _id: new ObjectId(luzsimple._id),
    }));

    console.log("Datos de sensores para insertar:", sensorData);
    // Cargar nuevos datos
    const resultSensors = await db.collection("sensors").insertMany(sensorData);
    const resultActuadores = await db
      .collection("actuadors")
      .insertMany(actuadoresData);
    const resultCoordenadas = await db
      .collection("coordenadas")
      .insertMany(datos.coordenadas);
    const resultLuces = await db
      .collection("luzs")
      .insertMany(lucesData);
    console.log("Resultados de la insercion serverside: ", resultSensors);
    return NextResponse.json({
      message: "Datos reemplazados correctamente",
      result: {
        sensors: resultSensors,
        actuadores: resultActuadores,
        coordenadas: datos.coordenadas,
      },
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
