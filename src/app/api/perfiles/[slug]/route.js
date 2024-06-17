import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.URIMONGO);

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    if (!slug) return NextResponse.json({ error: "Este ID no es válido" });
    await client.connect();
    const db = client.db("platformtfm");
    const coleccion = db.collection("perfiles");
    const responsePerfil = await coleccion.findOne({ _id: new ObjectId(slug) })
    return NextResponse.json(responsePerfil)

  } catch (error) {
    return NextResponse.json({
        error: "No se encontró el perfil con el ID proporcionado",
      });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = params;
    if (!slug) return NextResponse.json({ error: "Este ID no es válido" });
    await client.connect();
    const db = client.db("platformtfm");
    const coleccion = db.collection("perfiles");
    const result = await coleccion.deleteOne({ _id: new ObjectId(slug) });
    if (result.deletedCount === 1) {
      return NextResponse.json("PerfilEliminado");
    } else {
      return NextResponse.json({
        error: "No se encontró el perfil con el ID proporcionado",
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
