import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);
async function getSimulatedData(sensorName) {
  await client.connect();
  const db = client.db("platformtfm");
  const collection = db.collection("simulation");
  const datos = await collection.find({}).toArray();
  const sensorData = datos.map(sensor => {
    return {
        time: sensor.time,
        value: sensor.Sensores[sensorName],
    }
  })
  return sensorData;
}
export async function GET(req, {params}){
    const {sensor} = params;
    if (!sensor){
        return new NextResponse('Se requiere el nombre del sensor')
    }
    const data = await getSimulatedData(sensor);
    return NextResponse.json(data)
}