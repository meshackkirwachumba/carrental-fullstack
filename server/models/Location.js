import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    vehicleId:{type: String, required:true},
    lat:{type: Number, required:true},
    lng:{type: String, required:true},
    speed:{type: Number, required:true},
},{timestamps:true})

const Location = mongoose.model('Location', locationSchema)

export default Location