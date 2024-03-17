import { NextResponse } from "next/server";
import conexionDB from "../../../../../lib/dbConnect";
import Luz from "../../../../../models/Luz";
export async function GET(req, { params }) {
  const { slug } = params;
  console.log("Luz ID:", slug);
  await conexionDB();
  try {
    const LuzSimple = await Luz.findById(slug).lean();
    return NextResponse.json(LuzSimple);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch actuador");
  }
}
export async function DELETE(req,{params}) {
  const {slug} = params;
  console.log("LUZ ID to DELETE: ", slug)
  try {
    await conexionDB();
    await Luz.deleteOne({_id: slug}).lean();
    return NextResponse.json("Luz Eliminada correctamente")
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
      console.log("Luz to PATCH: ", slug);
      const luztoPatch = await Luz.findByIdAndUpdate({ _id: slug }, updatedData, {
        new: true,
      });
      return NextResponse.json({
        message: "Esta luz se actualizó correctamente",
        luztoPatch,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete this Luz");
    }
  }
