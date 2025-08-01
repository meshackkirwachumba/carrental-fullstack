import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async(req, res, nextFunc) =>{
    const token =req.headers.authorization
    if(!token){
        return res.json({success:false, message:"not authorized"})
    }

    try {
        //decode user._id from the token
        const userId = jwt.decode(token, process.env.JWT_SECRET_KEY)
        console.log("decodedUserId:", userId)

        if(!userId){
            return res.json({success:false, message:"not authorized"})
        }

        //if there is userId add user info to the req
        req.user = await User.findById(userId).select("-password")

        //call nextFunc
        nextFunc()
    } catch (error) {
        return res.json({success:false, message:"not authorized"})
    }
}