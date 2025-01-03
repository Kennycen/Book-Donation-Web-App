import React, { useState } from 'react'

const DonationForm = () => {
    const [isbn, setIsbn] = useState('')
    const [bookDetails, setBookDetails] = useState(null)

    const handleIsbnSubmit = (e) => {
        e.preventDefault()
        setBookDetails({ title: 'Sample Book', author: 'Sample Author' })
    }

    const handleDonationSubmit = (e) => {
        e.preventDefault()
        console.log('Donation submitted')
    }

    return (
        <div className="space-y-8">
            <form onSubmit={handleIsbnSubmit} className="space-y-4">
                <div>
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                    <input
                        id="isbn"
                        type="text"
                        placeholder="Enter ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Lookup Book
                </button>
            </form>

            {bookDetails && (
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={bookDetails.title}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            id="author"
                            type="text"
                            value={bookDetails.author}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                        <input
                            id="condition"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                        <textarea
                            id="notes"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Submit Donation
                    </button>
                </form>
            )}
        </div>
    )
}

export default DonationForm