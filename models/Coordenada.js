import mongoose, { mongo } from "mongoose";
const CoordenadaSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

export default mongoose.models.Coordenada ||
  mongoose.model("Coordenada", CoordenadaSchema);
