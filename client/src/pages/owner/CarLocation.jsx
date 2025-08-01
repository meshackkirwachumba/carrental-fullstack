import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import MapView from '../../components/owner/MapView';
import toast from "react-hot-toast"


const URL = "https://carrental-server-ten.vercel.app"

export const socket = io(URL);


function CarLocation() {
  const {vehicleId} = useParams()
  const [vehicleCoords, setVehicleCoords] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [carData, setCarData] = useState({})

  const fetchCarData = async(id)=>{
    try {
      const {data} = await axios.get(`/api/bookings/car-details/${id}`)

        if(data.success){
            setCarData(data.carDetails)
            
          }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(()=>{
     vehicleId && fetchCarData(vehicleId)
  }, [vehicleId])


  function myFunc() {
    let intervalId;
    let lat = 1.018076
    let lng = 35.000236

    intervalId = setInterval(() => {
      lat += Math.random() * 0.001
      lng += Math.random() * 0.001

      socket.emit("locationUpdate", {
        vehicleId,
        lat,
        lng,
        speed: Math.floor(Math.random() * 100)
      })
    }, 3000)

    // clear the interval after 120 seconds
    setTimeout(() => {
      clearInterval(intervalId); // Clear the interval using its ID
      console.log("Interval cleared.");
    }, 120000);
  }

  
  useEffect(()=>{
    myFunc()
    //listen for location broadcast coords from server
      socket.on("locationBroadcast", (data) => {
      setVehicleCoords((prev) => ({ ...prev, [data.vehicleId]: data }));
    });

    return ()=> socket.disconnect()
  }, [])

  const fetchCarHistory = async(vehicleId)=>{
     try {
          const { data } = await axios.get(`/api/car/history/${vehicleId}`)
          if(data.success){
            setLocationHistory(data.carLocationHistory)
          } else{
            toast.error(data.message)
          }
          
          
        } catch (error) {
          toast.error(error.message)
        }
  }
  

      console.log("car data:", carData);


  return (
    <div className='p-4 my-2'>
      {carData && <h1 className='text-4xl font-bold'>Tracking {carData[0]?.brand}</h1>}
      <MapView  vehicleCoords={vehicleCoords} locationHistory={locationHistory} />
      <button className='mt-2 rounded-lg p-2 bg-green-300 cursor-pointer' onClick={()=> fetchCarHistory(vehicleId)}>
        View Its Location History
      </button>
    </div>
  )

  }
  


  
    




  

export default CarLocation
