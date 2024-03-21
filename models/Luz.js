import mongoose, { mongo } from "mongoose";
const LuzSchema = new mongoose.Schema({
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
export default mongoose.models.Luz || mongoose.model("Luz", LuzSchema);
