import mongoose, { mongo } from "mongoose";

const SensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  minValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: true,
  },
  umbral: {
    type: Number,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },

});
export default mongoose.models.Sensor || mongoose.model("Sensor", SensorSchema);
