import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Hero = () => {
  return (
    <div className="relative z-0 bg-white">
      <div className="flex flex-col-reverse max-w-7xl mx-auto py-10 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex-row">
          <div className="space-y-8 lg:mt-28">
            <motion.h1 
              initial={{y: -30, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              transition={{duration: 0.8, delay: 0.5}}
              className="font-prata text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Share the Joy of Reading
            </motion.h1>
            <motion.p 
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.6, delay: 0.7}}
              className="text-sm md:text-lg text-gray-500 max-w-3xl">
                Donate your books and discover new stories. Join our community of book lovers, where every book finds a new home and every story inspires a new journey. Together, we can make a difference, one page, one story, and one reader at a time.
            </motion.p>
            <div className="flex space-x-4">
              <motion.Link 
                initial={{y: 30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.6, delay: 1}}
                to="/donate"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base cursor-pointer font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:drop-shadow-xl"
              >
                Donate Now
              </motion.Link>
              <motion.Link 
                initial={{y: 30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.6, delay: 1.2}}
                to="/inventory" className="inline-flex items-center px-6 py-3 border border-gray-300 cursor-pointer text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:drop-shadow-xl">
                  Browse Books
              </motion.Link>
            </div>
          </div>
          <motion.div 
          initial={{scale: 0}}
          whileInView={{scale: 1}}
          transition={{duration: 0.8, type: 'spring', stiffness: 40}}
          className="relative h-64 sm:h-80 md:h-96 lg:h-[34rem]">
            <img className="w-full h-full object-contain" src={assets.hero} alt="Books on a shelf"/>
          </motion.div>
      </div>
    </div>
  )
}

export default Hero