import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);


async function getSimulatedData(parametroSalud) {
    await client.connect();
    const db = client.db("platformtfm");
    const collection = db.collection("simulation");
    const datos = await collection.find({}).toArray();
    // console.log(datos)
    const sensorData = datos.map(dato => {
      return {
          time: dato.time,
          value: dato["Salud:"][parametroSalud],
      }
    })
    return sensorData;
  }
  export async function GET(req, {params}){
      const {parametro} = params;
    //   console.log(parametro)
      if (!parametro){
          return new NextResponse('Se requiere el nombre del parametro de salud')
      }
      const data = await getSimulatedData(parametro);
      return NextResponse.json(data)
  }

