import mongoose, {mongo} from "mongoose";
const LuzSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    zone:{
        type: String,
        required: true,
    },
});
export default mongoose.models.Luz || mongoose.model('Luz', LuzSchema)

