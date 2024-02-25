import { NextResponse } from "next/server";
import conexionDB from "../../../../lib/dbConnect";
import Sensor from "../../../../models/Sensor";
// Peticion para listar todos los sensores en la base de datos
export async function GET() {
  await conexionDB();
  const sensores = await Sensor.find();
  return NextResponse.json(sensores);
}
//  Peticion para crear un sensor en la base de datos
export async function POST(req) {
  const data = await req.json();
  const sensor = new Sensor(data);
  await sensor.save();
  return NextResponse.json(sensor);
  //
}
