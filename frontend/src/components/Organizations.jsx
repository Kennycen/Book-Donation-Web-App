import React from 'react'
import { assets } from '../assets/assets'

const Organizations = () => {
  return (
    <div className='mb-14 w-full border-t-2 border-b-2'>
      <div className='max-w-7xl mx-auto py-8 px-4 sm:py-12'>
        <div className='flex gap-8 items-center justify-center'>
          <div className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-20 sm:h-24 md:h-32 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.cuny} 
              alt="CUNY Logo" 
            />
          </div>
          <div className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-20 sm:h-24 md:h-32 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.suny} 
              alt="SUNY Logo" 
            />
          </div>
          <div className='w-full max-w-[250px] flex justify-center'>
            <img 
              className='h-16 sm:h-20 md:h-28 object-contain hover:scale-105 transition-transform duration-200' 
              src={assets.doe} 
              alt="DOE Logo" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Organizations