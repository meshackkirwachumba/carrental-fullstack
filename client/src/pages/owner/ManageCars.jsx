import { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { EyeOffIcon } from 'lucide-react'
import { BsEye } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function ManageCars() {
  const {isOwner, axios, currency, navigateTo} = useAppContext()

  const [cars, setCars] = useState([])


  const fetchOwnerCars = async()=>{
    try {
      const {data} = await axios.get('/api/owner/cars')
      //setCars(data.cars)
      if(data.success){
        setCars(data.cars)
        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

   const toggleAvailability = async(carId)=>{
    try {
      const {data} = await axios.post("/api/owner/toggle-car", {carId})
      if(data.succes){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

   const deleteCar = async(carId)=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if(!confirm) return null

      const {data} = await axios.post("/api/owner/delete-car", {carId})
      if(data.succes){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //if isOwner is true fetch owner cars
  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner, toggleAvailability])

  
  

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
       title="Manage Cars"
       subTitle="View all listed cars, update their details, or remove them from the 
       booking platform"
      />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
              <th className='p-3 font-medium'>Track</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index)=>(
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} alt="" 
                  className='aspect-square rounded-md object-cover h-12 w-12'
                  />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} . {car.transmission}</p>
                  </div>
                </td>
               
                <td className='p-3 max-md:hidden'>
                  {car.category}
                </td>
                <td className='p-3'>
                 {currency} {car.pricePerDay}/day
                </td>
                <td className='p-3 max-md:hidden'>
                 <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-500' :
                  'bg-red-100 text-red-500'}`}>
                  {car.isAvailable ? "Available" : "Unavailable"}
                 </span>
                </td>
                <td className='flex items-center gap-2 p-3'>
                  {car.isAvailable ? 
                   <EyeOffIcon 
                    className='cursor-pointer w-5 h-5'
                    onClick={()=> toggleAvailability(car._id)}
                     /> :
                   <BsEye
                    className='cursor-pointer'
                    onClick={()=> toggleAvailability(car._id)}
                     />
                   }

                   <FiDelete
                    className='cursor-pointer'
                    onClick={()=> deleteCar(car._id)}
                     />
                </td>
                 <td className='p-3'>
                  <button
                   onClick={()=>navigateTo(`/owner/car-location/${car._id}`)}
                   className='py-1 px-1 text-white bg-blue-400 rounded-full text-xs cursor-pointer hover:bg-blue-600'>
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars
