import express from "express"
import { getCarLocation } from "../controllers/locationControllers.js"

const locationRouter = express.Router()

locationRouter.get('/history/:vehicleId', getCarLocation)


export default locationRouter