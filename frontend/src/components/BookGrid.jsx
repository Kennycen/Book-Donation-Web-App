import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const BookGrid = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {books && books.map((book) => (
        <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <img
              src={book.imageUrl || assets.placeholder}
              alt={book.title}
              className="w-full h-[350px] mb-4 rounded-md"
            />
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
          <div className="p-4 border-t">
            <Link
              to={`/product/${book._id}`}
              className="block w-full px-4 py-2 text-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;