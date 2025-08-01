import  { useEffect, useState } from 'react'
import Title from '../components/Title'
import { FilterIcon, Search } from 'lucide-react'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from "motion/react"


const Cars = () => {
  // getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext()

  const [input, setInput] = useState('')
  //check if data is searchable
  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  //apply search filter
  const applyFilter = async()=>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }
    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  //check if car is available ie location, pickupdate, returndate
  const searchCarAvailability = async()=>{
    const {data} = await axios.post('/api/bookings/check-availability', {
      location:pickupLocation, pickupDate, returnDate
    })

    if(data.success){
      setFilteredCars(data.availableCars)
      if(data.availableCars.length === 0){
        toast("No cars available")
      }

      return null
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  },[])

  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input, cars])

  return (
    <div>
      <motion.div 
        initial={{opacity:0, y:30}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.6, ease:"easeOut"}}
       className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title
         title="Available Cars"
         subTitle="Browse our selection of premium vehicles available for yor next ride."
        />
        <motion.div
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.3, duration:0.5}}
         className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <Search className='w-4.5 h-4.5 mr-2' />
          <input
           onChange={(e)=>setInput(e.target.value)}
           value={input}
           type="text" placeholder='Search by make, model, or features'
           className='w-full h-full outline-none text-gray-500'
           />
          <FilterIcon className='w-4.5 h-4.5 ml-2' />
        </motion.div>
      </motion.div>

      <motion.div 
         initial={{opacity:0}}
         animate={{opacity:1}}
         transition={{delay:0.6, duration:0.5}}
         className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='mx-auto text-gray-500 xl:px-20 max-w-7xl'>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=>(
            <motion.div
             key={index}
             initial={{opacity:0, y:20}}
             animate={{opacity:1, y:0}}
             transition={{delay:0.1 * index, duration:0.4}}
             >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Cars
