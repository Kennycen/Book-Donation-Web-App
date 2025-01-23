import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Organizations = () => {
  return (
    <div className='mb-14 w-full border-t-2 border-b-2'>
      <div className='max-w-7xl mx-auto py-8 px-4 sm:py-12'>
        <div className='flex gap-8 items-center justify-center'>
          <motion.div 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.5}}
          className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-20 sm:h-24 md:h-32 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.cuny} 
              alt="CUNY Logo" 
            />
          </motion.div>
          <motion.div 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.7}}
          className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-20 sm:h-24 md:h-32 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.suny} 
              alt="SUNY Logo" 
            />
          </motion.div>
          <motion.div 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.8}}
          className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-16 mr-5 sm:h-20 md:h-28 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.doe} 
              alt="DOE Logo" 
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Organizations