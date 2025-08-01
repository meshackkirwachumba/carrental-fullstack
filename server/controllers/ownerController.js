import imagekit from "../configs/imageKit.js"
import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
import User from "../models/User.js"
import fs from "fs"

export const changeRoleToOwner = async(req, res)=>{
    try {
       const {_id} = req.user
       await User.findByIdAndUpdate(_id, {role: "owner"})
       res.json({success: true, message:"Now you can list cars"})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

//api to list car
export const addCar = async(req, res)=>{
    try {
        //get user._id from the protect middleware
        const {_id} = req.user
        let car = JSON.parse(req.body.carData)

        const imageFile = req.file

        // upload image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        })

        //Optimized image url
        var optimizedImageURL = imagekit.url({
        path : response.filePath,
        transformation : [
            {width: "1280"}, //width resizing
            {quality:"auto"}, //auto compression
            {format:"webp"} //convert to modern format
        ]})

        const image = optimizedImageURL

        await Car.create({...car, owner:_id, image})

        res.json({success:true, message:"Car Added"})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

//API to List Owner Cars
export const getOwnerCars = async(req, res)=>{
    try {
        const {_id} = req.user
        //find all cars associated with owner _id
        const cars = await Car.find({owner:_id})
        res.json({success:true, cars})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}


//API to Toggle Car Availability
export const toggleCarAvailability = async(req, res)=>{
     try {
        const {_id} = req.user
        //find carId from the req body
        const {carId} = req.body
        const car = await Car.findById(carId)

        //check if car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"unauthorized"})
        }

        //toggle btw true or false
        car.isAvailable = !car.isAvailable
        //save in db
        await car.save()

        res.json({success:true, message:"Availability Toggled"})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

//API to delete owner vehicle
export const deleteCar = async(req, res)=>{
     try {
        const {_id} = req.user
        //find carId from the req body
        const {carId} = req.body
        const car = await Car.findById(carId)

        //check if car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"unauthorized"})
        }

        //let car owner id be null and make availability false
        car.owner = null
        car.isAvailable = false
        //save changes in db
        await car.save()

        res.json({success:true, message:"Car Removed"})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

//API to get Dashboard data
export const getDashboardData = async(req, res)=>{
    try {
        const {_id, role} = req.user

        if(role !== 'owner'){
            return res.json({success:false, message:"unauthorized"})
        }

        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate('carId').sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner:_id, status:"pending"})
        const confirmedBookings = await Booking.find({owner:_id, status:"confirmed"})

        //calculate monthly revenue from bookings where status is confirmed
        //slice creates a shallow copy not modify original array
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").
        reduce((acc, booking)=> acc + booking.price, 0)

        const dashboardData = {
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:confirmedBookings.length,
            recentBookings:bookings.slice(0, 3),
            monthlyRevenue:monthlyRevenue
        }

        res.json({success:true, dashboardData})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}



//API to update user image
export const updateUserImage = async(req, res)=>{
    try {
        const { _id } = req.user

         const imageFile = req.file

        // upload image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/users'
        })

        //Optimized image url
        var optimizedImageURL = imagekit.url({
        path : response.filePath,
        transformation : [
            {width: "400"}, //width resizing
            {quality:"auto"}, //auto compression
            {format:"webp"} //convert to modern format
        ]})

        const image = optimizedImageURL

        await User.findByIdAndUpdate(_id, {image})

        res.json({success:true, message:"image updated"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}