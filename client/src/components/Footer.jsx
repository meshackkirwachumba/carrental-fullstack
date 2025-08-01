import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import {motion} from "motion/react"


const Footer = () => {
  return (
     <motion.div
       initial={{opacity:0, y:30}}
       whileInView={{opacity:1, y:0}}
       transition={{duration:0.6}}
       className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <motion.div 
               initial={{opacity:0, y:20}}
               whileInView={{opacity:1, y:0}}
               transition={{duration:0.6, delay:0.2}}
               className='flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor'>
                <div>
                    <motion.img 
                      initial={{opacity:0}}
                      whileInView={{opacity:1}}
                      transition={{duration:0.5, delay:0.3}}
                      src="/favicon.svg" alt="logo"
                      className='h-8 md:h-9' />
                    <motion.p
                      initial={{opacity:0}}
                      whileInView={{opacity:1}}
                      transition={{duration:0.5, delay:0.4}}
                      className='max-w-80 mt-3'>
                        Get yourself a premium service with our wide selection of comfortable and reliable fleet
                        of vehicles for all your driving needs.
                    </motion.p>
                    <motion.div
                      initial={{opacity:0}}
                      whileInView={{opacity:1}}
                      transition={{duration:0.5, delay:0.5}}
                      className='flex items-center gap-3 mt-6'>
                        <a href="#" className="w-5 h-5"><FaFacebook /></a>
                        <a href="#" className="w-5 h-5"><FaInstagram /></a>
                        <a href="#" className="w-5 h-5"><FaXTwitter /></a>  
                        <a href="#" className="w-5 h-5"><SiGmail /></a>  
                    </motion.div>
                </div>


                <motion.div
                  initial={{opacity:0}}
                  whileInView={{opacity:1}}
                  transition={{duration:0.5, delay:0.5}}
                >
                    <h2 className='text-base font-medium uppercase text-gray-800'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cars">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </motion.div>

                <motion.div
                  initial={{opacity:0}}
                  whileInView={{opacity:1}}
                  transition={{duration:0.5, delay:0.5}}>
                    <h2 className='text-base font-medium uppercase text-gray-800'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="/">Help Center</a></li>
                        <li><a href="/cars">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </motion.div>

                 <motion.div
                  initial={{opacity:0}}
                  whileInView={{opacity:1}}
                  transition={{duration:0.5, delay:0.5}}>
                    <h2 className='text-base font-medium uppercase text-gray-800'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>Oloo street</li>
                        <li>Kitale, Kenya</li>
                        <li>+254 700 000000</li>
                        <li>info@carrental.com</li>
                    </ul>
                </motion.div>
              
            </motion.div>
          
            <motion.div
               initial={{opacity:0, y:10}}
               whileInView={{opacity:1, y:0}}
               transition={{duration:0.6, delay:0.6}}
               className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Car Rental. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </motion.div>
        </motion.div>
  )
}

export default Footer
