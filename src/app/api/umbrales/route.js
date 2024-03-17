import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
const client = new MongoClient(process.env.URIMONGO);

async function getLimits() {
  await client.connect();
  const db = client.db("platformtfm");
  const collection = db.collection("umbrales");
  const datos = await collection.find({}).toArray();
  return datos;
}
export async function GET(){
    const data = await getLimits()
    return NextResponse.json(data);
}