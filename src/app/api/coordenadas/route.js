import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);


export async function GET() {
    await client.connect();
    const db = client.db("platformtfm");
    const collection = db.collection("coordenadas");
    const datos = await collection.find({}).toArray()
    return NextResponse.json(datos)
}

export async function POST(req){
    await client.connect();
    const db = client.db("platformtfm");
    const collection = db.collection("coordenadas");
    const coordenadas = await req.json();
    
    try {
        await collection.deleteMany({})
        await collection.insertMany(coordenadas)
        return NextResponse.json("Respuesta correcta");
    } catch (error) {
        console.error('Error al guardar la coordenada:', error);
        return NextResponse.json(error);
    }
}



