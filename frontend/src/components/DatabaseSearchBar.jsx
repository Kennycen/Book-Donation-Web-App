import { useState } from "react";
import { assets } from "../assets/assets";
import { bookService } from "../api/books";

const DatabaseSearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIsbnHelp, setShowIsbnHelp] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter an ISBN.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await bookService.searchByISBN(searchQuery);
      onSearchResults(data);
      setError("");
    } catch (err) {
      console.error("Search error:", err);
      if (err.response?.status === 404) {
        setError(
          "Sorry, we don't have this book in our collection yet. Would you like to donate it?"
        );
      } else {
        setError("Error searching for book. Please try again.");
      }
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8 px-4 py-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="isbn-search"
              className="text-sm font-medium text-gray-700"
            >
              Enter ISBN:
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setShowIsbnHelp(!showIsbnHelp)}
            >
              Where to find ISBN?
            </button>
          </div>
          <div className="flex gap-2">
            <input
              id="isbn-search"
              type="text"
              placeholder="Enter ISBN to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
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

      {/* Help Text for ISBN */}
      {showIsbnHelp && (
        <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col items-center space-y-3">
            <img
              src={assets.isbn}
              alt="ISBN location on book"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-600 text-center">
              The ISBN (International Standard Book Number) can be found on the
              back cover of the book or on the copyright page. It's typically a
              10 or 13-digit number.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSearchBar;
