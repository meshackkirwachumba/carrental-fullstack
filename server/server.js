import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRouter from "./routes/userRoutes.js"
import ownerRouter from "./routes/ownerRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"
import http from "http"
import { Server } from "socket.io";
import Location from "./models/Location.js"
import locationRouter from "./routes/locationRoutes.js"

//initialize Express App
const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//connect to db
await connectDB()

//web socket server
const httpServer = http.createServer(app)
//web socket set up
const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:5173",
    }
})

io.on("connection", (socket) =>{
    console.log("client connected:", socket.id);
   
    //get location updates from client
    socket.on("locationUpdate", async(data)=>{
        console.log("Location coords received:", data);

        try {
          const locationData = new Location(data)
          await locationData.save()
        } catch (error) {
            console.log(error.message);
            
        }
        
         //Emit the message to all connected clients
        io.emit("locationBroadcast", data)
    })

    //disconnect event
    socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
    
})

app.get('/', (req, res)=> res.send("Server is running..."))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/car', locationRouter)




const PORT = process.env.PORT || 3000
httpServer.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))