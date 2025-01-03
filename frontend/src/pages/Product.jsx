import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

const Product = () => {
  const { backendUrl } = useAppContext();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/books/${productId}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [productId, backendUrl]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`${backendUrl}/api/books/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Book successfully deleted');
        navigate('/inventory'); // Redirect to inventory page
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete book');
      }
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-center">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-red-600">
              {error || 'Book not found'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Book Image */}
              <div className="md:flex-shrink-0 md:w-1/3">
                <img
                  src={book.imageUrl || 'https://via.placeholder.com/400'}
                  alt={book.title}
                  className="w-full h-96 object-cover md:h-full"
                />
              </div>

              {/* Book Details */}
              <div className="p-8 md:w-2/3">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  {book.condition}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {book.title}
                </h1>
                <p className="mt-2 text-xl text-gray-600">
                  By {book.author}
                </p>
                <p className="mt-2 text-gray-600">
                  Published: {book.publishDate}
                </p>
                <p className="mt-2 text-gray-600">
                  ISBN: {book.isbn}
                </p>
                
                {/* Description */}
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                  <p className="mt-2 text-gray-600">
                    {book.description || 'No description available.'}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mt-8 border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  <div className="mt-4 flex items-center">
                    <svg 
                      className="h-6 w-6 text-pink-600"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                    <a
                      href={`https://instagram.com/${book.instagramUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      @{book.instagramUsername}
                    </a>
                  </div>
                </div>

                {/* Book Condition Details */}
                <div className="mt-8 border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Book Condition</h2>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold" 
                    style={{
                      backgroundColor: 
                        book.condition === 'new' ? '#DEF7EC' :
                        book.condition === 'used-like-new' ? '#E1EFFE' :
                        '#FDE8E8',
                      color:
                        book.condition === 'new' ? '#03543F' :
                        book.condition === 'used-like-new' ? '#1E429F' :
                        '#9B1C1C'
                    }}
                  >
                    {book.condition === 'new' ? 'New' :
                     book.condition === 'used-like-new' ? 'Used - Like New' :
                     'Used - Readable'}
                  </div>
                </div>

                {/* Add Delete Button */}
                <div className="mt-8 border-t pt-6">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Book (Mark as Donated)'}
                  </button>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Click this button when the book has been donated to another person
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;