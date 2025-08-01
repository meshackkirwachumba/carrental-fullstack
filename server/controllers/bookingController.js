import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

//function to check availability of a car for a given date
const checkAvailability = async(carId, pickupDate, returnDate)=>{
    const bookings = await Booking.find({
        carId:carId,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate}
    })

    return bookings.length === 0
}

//API to check Availability of Cars for the given date and location
export const checkAvailabilityOfCar = async(req, res)=>{
    try {
        const {location, pickupDate, returnDate} = req.body
        // fetch all available cars for a given location
        const cars = await Car.find({location:location, isAvailable:true})

        //check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async(car)=>{
            const isAvailable= await checkAvailability(car._id, pickupDate, returnDate)

            return {...car._doc, isAvailable:isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises)
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success:true, availableCars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
        
    }
}

//api to create booking
export const createBooking = async(req, res)=>{
    try {
        const { _id } = req.user
        const {carId, pickupDate, returnDate} = req.body

        const isCarAvailable = await checkAvailability(carId, pickupDate, returnDate)
        if(!isCarAvailable){
            return res.json({success:false, message:"car is not available"})
        }

        const carData = await Car.findById(carId)

        //calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays

        

        //save booking data in a db
        await Booking.create({
            carId:carId,
            owner:carData.owner,
            user:_id,
            pickupDate,
            returnDate,
            price
        })

        res.json({success:true, message:"Booking Created"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//api to list user bookings
export const getUserBookings = async(req, res)=>{
    try {
        const { _id } = req.user
        const bookings = await Booking.find({user:_id}).populate("carId").sort({
            createdAt: -1
        })

        res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


//api to get owner bookings
export const getOwnerBookings = async(req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success:false, message:"unauthorized"})
        }

        const bookings = await Booking.find({owner:req.user._id}).
        populate('carId user').select("-user.password").sort({createdAt:-1})

        res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


//api to change booking status
export const changeBookingStatus = async(req, res)=>{
    try {
        const { _id } = req.user
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message:"unauthorized"})
        }

        booking.status = status
        await booking.save()

        res.json({success:true, message:"status updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//api to GET car details
export const getCarDetails = async(req, res)=>{
    try {
        const { id } = req.params
        const carDetails = await Car.find({_id:id})

        res.json({success:true, carDetails})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


