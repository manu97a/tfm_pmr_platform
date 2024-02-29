import mongoose, { mongo } from "mongoose";

const ActuadorSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  
});
export default mongoose.models.Actuador || mongoose.model('Actuador', ActuadorSchema);