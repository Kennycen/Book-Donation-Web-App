import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const RecommendedBooks = () => {
  const { backendUrl } = useAppContext();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/api/inventory/latest`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching latest books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBooks();
  }, [backendUrl]);

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h2 className="font-prata text-4xl font-extrabold text-gray-900 mb-8 text-center">Latest Books</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
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
                  More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12 text-center">
        <Link
          to="/inventory"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Explore More Books
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default RecommendedBooks;