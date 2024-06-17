import { MongoClient } from "mongodb";
import conexionDB from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);

async function getData() {
  await client.connect();
  const db = client.db("platformtfm");
  const Sensorcollection = db.collection("sensors");
  const sensorData = await Sensorcollection.find({}).toArray();
  const Lucescollection = db.collection("luzs");
  const lucesData = await Lucescollection.find({}).toArray();
  const actuadoresCollection = db.collection("actuadors");
  const actuadoresData = await actuadoresCollection.find({}).toArray();
  const coordenadasCollection = await db.collection("coordenadas");
  const coordenadasData = await coordenadasCollection.find({}).toArray();

  return {
    sensors: sensorData,
    luzs: lucesData,
    actuadores: actuadoresData,
    coordenadas: coordenadasData,
  };
}

export async function POST(req) {
  try {
    const { name: nombrePerfil } = await req.json();
    if (!nombrePerfil) {
      return NextResponse.json({
        error: "Es necesario agregar un nombre al perfil",
      });
    }
    const db = client.db("platformtfm");
    const coleccion = db.collection("perfiles");
    const perfilExistente = await coleccion.findOne({ name: nombrePerfil });
    if (perfilExistente) {
      return NextResponse.json({
        error: "El nombre del perfil ya existe",
      });
    }
    const data = await getData();
    const perfil = { ...data, name: nombrePerfil };
    await coleccion.insertOne(perfil);

    return NextResponse.json("PerfilCreado");
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("platformtfm");
    const collection = db.collection("perfiles");
    const perfiles = await collection.find({}).toArray();
    return NextResponse.json(perfiles);
  } catch (error) {
    return NextResponse.json(error);
  }
}
