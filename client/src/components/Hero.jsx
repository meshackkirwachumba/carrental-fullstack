import { Search } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import {motion} from "motion/react"
const cityList = ["Eldoret", "Kitale", "Kakamega", "Bungoma"]

const Hero = () => {
  const[pickupLocation, setPickupLocation] = useState('')

  const {
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        navigateTo
      } = useAppContext()

  const handleSearch = (e)=>{
    e.preventDefault()
    navigateTo("/cars?pickupLocation=" + pickupLocation + "&pickupDate=" + pickupDate + 
      "&returnDate=" + returnDate)
  }
  return (
    <motion.div
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{duration:0.8}}
        className='bg-white h-screen flex flex-col items-center justify-center gap-14  text-center'>
        <motion.h1
         className='text-4xl md:text-5xl font-semibold'
         initial={{y:50, opacity:0}}
         animate={{y:0, opacity:1}}
         transition={{duration:0.8, delay:0.2}}
         >Luxury Cars on Rent
         </motion.h1>    

        <motion.form
         initial={{scale:0.95, opacity:0, y:50}}
         animate={{scale:1, opacity:1, y:0}}
         transition={{duration:0.6, delay:0.4}}
         onSubmit={handleSearch}
         className='flex flex-col md:flex-row items-start md:items-center justify-between
           p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
              <div className='flex flex-col items-start gap-2'>
                <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                  <option value="">Pickup Location</option>
                  {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                </select>
                <p className='px-1 text-sm text-gray-500'>
                  { pickupLocation ? pickupLocation : "Please Select Location"  }
                  </p>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <label htmlFor="pickup-date">Pick up Date</label>
                <input
                  type="date"
                  id="pickup-date"
                  value={pickupDate}
                  onChange={e => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className='text-sm text-gray-500'
                  required
                  />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <label htmlFor="pickup-date">Return Date</label>
                <input
                  type="date"
                  id="return-date"
                  value={returnDate}
                  onChange={e=> setReturnDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className='text-sm text-gray-500'
                  required
                  />
              </div>
            </div>
            <motion.button 
             whileHover={{scale:1.05}}
             whileTap={{scale:0.95}}
             className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary
              hover:bg-primary-dull text-white rounded-full cursor-pointer'>
                <Search className='h-8 w-12'/>Search
            </motion.button>
        </motion.form>

        <motion.img
         initial={{y:100, opacity:0}}
         animate={{y:0, opacity:1}}
         transition={{duration:0.8, delay:0.6}}
         src="/heropicture.png" alt="herocar" className='max-h-74' />
    </motion.div>
  )
}

export default Hero
