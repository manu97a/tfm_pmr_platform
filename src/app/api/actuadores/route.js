import { NextResponse } from "next/server";
import conexionDB from "../../../../lib/dbConnect";
import Actuadores from "../../../../models/Actuadores";

export async function GET() {
  await conexionDB();
  const actuadores = await Actuadores.find();
  return NextResponse.json(actuadores);
}

export async function POST(req) {
  await conexionDB();
  try {
    const data = await req.json();
    const actuador = new Actuadores(data);
    await actuador.save();

    return NextResponse.json(actuador);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE() {
  await conexionDB();
  try {
    const result = await Actuadores.deleteMany({});
    return NextResponse.json({
      message: "Todos los actuadores han sido eliminados",
      result,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}