import Actuadores from "../../../../../models/Actuadores";
import conexionDB from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;
  console.log("ACTUADOR ID: ", slug);
  await conexionDB();
  try {
    const actuadorSimple = await Actuadores.findById(slug).lean();
    return NextResponse.json(actuadorSimple);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch actuador");
  }
}

export async function DELETE(req, { params }) {
    const { slug } = params;
    console.log("ACTUADOR ID TO DELETE: ", slug);
    try {
      await conexionDB();
      await Actuadores.deleteOne({ _id: slug }).lean();
      return NextResponse.json("Actuador eliminado correctamente");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete Actuador");
    }
  }

export async function PATCH(req, { params }) {
    try {
      await conexionDB();
      const { slug } = params;
      const updatedData = await req.json();
      console.log("Actuador to PATCH: ", slug);
      const actuador = await Actuadores.findByIdAndUpdate({ _id: slug }, updatedData, {
        new: true,
      });
      return NextResponse.json({
        message: "El actuador se actualizó correctamente",
        actuador,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete this actuador");
    }
  }
