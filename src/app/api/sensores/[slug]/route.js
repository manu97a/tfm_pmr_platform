import Sensor from "../../../../../models/Sensor";
import conexionDB from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const {slug} = params;
    console.log("SENSOR ID: ",slug)
    try {
        await conexionDB();
        const sensorSimple = await Sensor.findById(slug).lean()
        return NextResponse.json(sensorSimple)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch sensor")
    }
}
export async function DELETE(req, {params}){
    const {slug} = params;
    console.log("SENSOR ID: ",slug)
    try {
        await conexionDB();
        await Sensor.deleteOne({_id: slug}).lean()
        return NextResponse.json("Sensor eliminado correctamente")
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete sensor")
    }
}
