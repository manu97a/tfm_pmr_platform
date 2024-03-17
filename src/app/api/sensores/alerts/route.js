import { NextResponse } from "next/server";
import conexionDB from "../../../../../lib/dbConnect";
import Sensor from "../../../../../models/Sensor";

export async function GET() {
    await conexionDB();
    try {
      const sensores = await Sensor.find({}, '_id name umbral'); // Obtener solo _id y umbral
      return NextResponse.json(sensores);
    } catch (error) {
      return NextResponse.error(error);
    }
  }