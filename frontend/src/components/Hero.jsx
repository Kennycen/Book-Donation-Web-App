import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col-reverse max-w-7xl mx-auto py-10 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex-row">
          <div className="space-y-8 lg:mt-28">
            <h1 className="font-prata text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Share the Joy of Reading
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl">
            Donate your books and discover new stories. Join our community of book lovers, where every book finds a new home and every story inspires a new journey. Together, we can make a difference, one page, one story, and one reader at a time.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/donate"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:drop-shadow-xl"
              >
                Donate Now
              </Link>
              <Link to="/inventory" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:drop-shadow-xl">
                Browse Books
              </Link>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[34rem]">
            <img className="w-full h-full object-contain" src={assets.hero} alt="Books on a shelf"/>
          </div>
      </div>
    </div>
  )
}

export default Hero