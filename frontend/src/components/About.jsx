import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left side - Images */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex items-center justify-center w-full max-w-[600px]">
            <div className="origin-bottom -rotate-12 z-0 w-[45%]">
              <img 
                className="w-full h-auto" 
                src={assets.book1} 
                alt="Book donation" 
              />
            </div>
            <div className="-ml-10 origin-top-left rotate-12 z-10 w-[45%]">
              <img 
                className="w-full h-auto" 
                src={assets.book2} 
                alt="Book sharing" 
              />
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <h2 className="font-prata text-4xl font-bold text-gray-900">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
          This web app was created to connect students through book donations and sharing. Its purpose is to provide a convenient platform where students can donate books they no longer need and find books to support their studies. By fostering a culture of giving and reusing, reduces waste, and builds a stronger community.
          </p>
          <Link 
            to="/donate"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base 
                     font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:drop-shadow-xl
                     transition-colors duration-200 w-fit"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About