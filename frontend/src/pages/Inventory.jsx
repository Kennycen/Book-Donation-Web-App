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