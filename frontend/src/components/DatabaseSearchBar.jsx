import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const DatabaseSearchBar = ({ onSearchResults }) => {
  
  const { backendUrl } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter an ISBN.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/inventory/search/${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        onSearchResults(data);
        setError('');
      } else {
        setError('Sorry, we don\'t have this book in our collection yet. Would you like to donate it?');
        onSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Error searching for book. Please try again.');
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8 px-5">
      <form onSubmit={handleSearch} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Enter ISBN to search our collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
          {error.includes("don't have this book") && (
            <a 
              href="/donate" 
              className="mt-2 inline-block text-blue-600 hover:text-blue-800"
            >
              Click here to donate this book →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default DatabaseSearchBar; 