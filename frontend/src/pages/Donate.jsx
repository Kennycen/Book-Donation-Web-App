import React from 'react'
import DonateBookForm from '../components/DonateBookForm'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Donate = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-prata text-3xl font-extrabold text-center mb-8">Donate a Book</h1>
          
          {/* Instructions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Donate a Book</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">1</span>
                <p className="ml-3 text-gray-600">
                  Search for your book using the ISBN number (click "Where to find ISBN?" if you need help locating it)
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">2</span>
                <p className="ml-3 text-gray-600">
                  Enter your Instagram username - this will be used for communication with potential recipients
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</span>
                <p className="ml-3 text-gray-600">
                  Select the condition of your book:
                  <ul className="mt-2 ml-4 list-disc space-y-1">
                    <li><span className="font-medium">New:</span> Never used, perfect condition</li>
                    <li><span className="font-medium">Used - Like New:</span> Minimal wear, no markings</li>
                    <li><span className="font-medium">Used - Readable:</span> Shows wear but fully readable</li>
                  </ul>
                </p>
              </div>
            </div>

            {/* Important Reminder */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800">Important Reminder</h3>
              <p className="mt-2 text-sm text-yellow-700">
                Once you've successfully given your book to someone, please return to the book's details page and click the 
                "Delete Book (Mark as Donated)" button. This helps us maintain an accurate inventory and ensures others 
                don't contact you about already donated books.
              </p>
            </div>
          </div>

          {/* Donation Form */}
          <DonateBookForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Donate