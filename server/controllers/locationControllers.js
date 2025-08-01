import Location from "../models/Location.js";

export const getCarLocation = async(req, res)=>{
    try {
        const { vehicleId } = req.params
        const carLocationHistory = await Location.find({vehicleId}).sort({createdAt:-1}).limit(40)

        res.json({success:true, carLocationHistory})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}