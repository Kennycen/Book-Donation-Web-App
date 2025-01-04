import React, { useState, useEffect } from 'react';
import DatabaseSearchBar from '../components/DatabaseSearchBar';
import BookGrid from '../components/BookGrid';
import Pagination from '../components/Pagination';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

const Inventory = () => {
  const { backendUrl } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/api/inventory/all?page=${page}&limit=20`);
      const data = await response.json();
      
      if (response.ok) {
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        console.error('Failed to fetch books:', data.error);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearchActive) {
      fetchBooks(currentPage);
    }
  }, [currentPage, isSearchActive]);

  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setBooks(results);
      setIsSearchActive(true);
      setTotalPages(1); 
    } else {
      setIsSearchActive(false);
      fetchBooks(1); 
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-prata text-3xl font-extrabold text-center mb-8">Book Inventory</h1>
          {/* Instructions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How it Works?</h2>
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
                  When you desired book is found. Click on "View Details"
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</span>
                <p className="ml-3 text-gray-600">
                  It will display the book information and User Instagram username for contact:
                  <ul className="mt-2 ml-4 list-disc space-y-1">
                    <li><span className="font-medium">Title:</span> Book title and Relevant information</li>
                    <li><span className="font-medium">Instagram Username:</span> Contact user to receive book</li>
                    <li><span className="font-medium">Mark as Donated:</span> Button to remove book when is received</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <DatabaseSearchBar onSearchResults={handleSearchResults} />
          
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <BookGrid books={books} />
              {!isSearchActive && books.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
              {books.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No books found.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inventory;