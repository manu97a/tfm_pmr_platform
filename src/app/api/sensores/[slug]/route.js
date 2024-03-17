import { MongoClient } from "mongodb";
import Sensor from "../../../../../models/Sensor";
import conexionDB from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);
// Peticion para encontrar un sensor en especifico COMPLETADA
export async function GET(req, { params }) {
  const { slug } = params;
  console.log("SENSOR ID: ", slug);
  await conexionDB();
  try {
    const sensorSimple = await Sensor.findById(slug).lean();
    return NextResponse.json(sensorSimple);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sensor");
  }
}

// Peticion para eliminar un sensor en especifico COMPLETADA
export async function DELETE(req, { params }) {
  const { slug } = params;
  console.log("SENSOR ID TO DELETE: ", slug);
  try {
    await conexionDB();
    await Sensor.deleteOne({ _id: slug }).lean();
    return NextResponse.json("Sensor eliminado correctamente");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete sensor");
  }
}

// Peticion para editar un sensor en especifico  PARCIALMENTE REALIZAD
export async function PATCH(req, { params }) {
  try {
    await conexionDB();
    const { slug } = params;
    const updatedData = await req.json();
    console.log("Sensor to PATCH: ", slug);
    const sensorAntiguo = await Sensor.findById({ _id: slug });
    if (updatedData.name !== sensorAntiguo.name) {
      await actualizarDatos(sensorAntiguo.name, updatedData.name);
    }
    const sensor = await Sensor.findByIdAndUpdate({ _id: slug }, updatedData, {
      new: true,
    });
    return NextResponse.json({
      message: "El sensor se actualizó correctamente",
      sensor,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete sensor");
  }
}
async function actualizarDatos(nombreAntiguo, nombreNuevo) {
  try {
    await client.connect();
    const db = client.db("platformtfm");
    const collection = db.collection("simulation");
    const query = {};
    query[`Sensores.${nombreAntiguo}`] = { $exists: true };
    const datos = await collection.find(query).toArray();
    for (const dato of datos) {
      const updateQuery = {
        $set: {
          [`Sensores.${nombreNuevo}`]: dato.Sensores[nombreAntiguo]
        },
        $unset: {
          [`Sensores.${nombreAntiguo}`]: ""
        }
      };
      await collection.updateOne({ _id: dato._id }, updateQuery);
    }
  } catch (error) {
    console.error("Error al actualizar documentos relacionados:", error);
    throw error;
  }
}
