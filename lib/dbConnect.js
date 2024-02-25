import mongoose from "mongoose";
const URIMONGO = process.env.URIMONGO;

const conexionDB = async () => {
  try {
    await mongoose.connect(URIMONGO);
    console.log("Conectado con la BASE DE DATOS para TFM")
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default conexionDB
