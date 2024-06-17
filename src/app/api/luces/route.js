import { NextResponse } from "next/server";
import conexionDB from "../../../../lib/dbConnect";
import Luz from "../../../../models/Luz";
export async function GET() {
  await conexionDB();
  const luces = await Luz.find();
  return NextResponse.json(luces);
}
export async function POST(req) {
  await conexionDB();
  try {
    const datos = await req.json();
    const nuevaluz = new Luz(datos);
    await nuevaluz.save();
    return NextResponse.json(nuevaluz);
  } catch (error) {
    return NextResponse.json(error)
  }
}
export async function DELETE() {
  await conexionDB();
  try {
    const result = await Luz.deleteMany({});
    return NextResponse.json({
      message: "Todos las luces han sido eliminados",
      result,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
