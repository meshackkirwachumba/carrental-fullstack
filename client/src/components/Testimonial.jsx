import {motion} from "motion/react"
import Title from './Title';

    const testimonials = [
        { 
            name: "Emma Wafula",
            location: "Kitale, Kenya",
            image: "/afrique2.jpg",
            testimonial: "I've rented cars from various companies, but the experience with carRental was exceptional",
            rating:4
         },
         { 
            name: "Liam Macharia",
            location: "Kiambu, Kenya",
            image: "afrique1.jpeg",
            testimonial: "I’m truly impressed by the quality of carRental vehicles. The entire ride was smooth, and it exceeded all expectations. Thank you!",
            rating:5
         },
        { 
            name: "Safia Hassan",
            location: "Eldoret, Kenya",
            image: "afrique3.jpg",
            testimonial: "Fantastic experience! From start to finish, the carRental team was professional, responsive, and genuinely cared about delivering great results.",
            rating:3 
        }
    ];

     const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );
   
    

const Testimonial = () => {
  return (
     <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
          <Title
            title="What Our Customers  Say"
            subTitle="Discover why discerning car enthusiasts choose Car Rental for their luxury travel around Kenya."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                      initial={{opacity:0, y:40}}
                      whileInView={{opacity:1, y:0}}
                      transition={{duration:0.6, delay:index * 0.2, ease:'easeOut'}}
                      viewport={{once:true, amount:0.3}}
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-lg hover:-translate-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
            
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
