import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);
async function getSimulatedData() {
  await client.connect();
  const db = client.db("platformtfm");
  const collection = db.collection("simulation");
  const datos = await collection.find({}).toArray();
  const sensoresSimulados = datos.map(sensor => {
    return {
        time: sensor.time,
        value: sensor.Sensores,
    }
  })
  return sensoresSimulados;
}
export async function GET() {
  const data = await getSimulatedData();
  return NextResponse.json(data);
}
