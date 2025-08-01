import express from "express"
import { 
        changeBookingStatus,
        checkAvailabilityOfCar,
        createBooking,
        getCarDetails,
        getOwnerBookings,
        getUserBookings
     } from "../controllers/bookingController.js"
import { protect } from "../middleware/auth.js"

const bookingRouter = express.Router()

bookingRouter.post("/check-availability", checkAvailabilityOfCar)
bookingRouter.post("/create", protect, createBooking)
bookingRouter.get("/user", protect, getUserBookings)
bookingRouter.get("/owner-bookings", protect, getOwnerBookings)
bookingRouter.post("/change-status", protect, changeBookingStatus)
bookingRouter.get("/car-details/:id", getCarDetails)

export default bookingRouter