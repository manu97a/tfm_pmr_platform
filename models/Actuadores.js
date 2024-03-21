import mongoose, { mongo } from "mongoose";

const ActuadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  xcoordinate: {
    type: Number,
    required: true,
  },
  ycoordinate: {
    type: Number,
    required: true,
  },
});
export default mongoose.models.Actuador ||
  mongoose.model("Actuador", ActuadorSchema);
