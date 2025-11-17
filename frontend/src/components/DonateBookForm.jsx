import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useGoogleBooks } from "../hooks/useGoogleBooks";
import { useDonateBook } from "../hooks/useDonateBook";

const DonateBookForm = () => {
  const {
    bookDetails,
    isLoading: isSearching,
    error: searchError,
    searchByISBN,
    reset,
  } = useGoogleBooks();
  const { donateBook, isSubmitting, error: donateError } = useDonateBook();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [instagram, setInstagram] = useState("");
  const [showIsbnHelp, setShowIsbnHelp] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter an ISBN.");
      return;
    }

    const result = await searchByISBN(searchQuery);
    if (result) {
      toast.success("Book found!");
    } else if (searchError) {
      toast.error(searchError);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!condition || !instagram || !bookDetails) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    const donation = {
      title: bookDetails.title,
      author: bookDetails.authors.join(", "),
      isbn: searchQuery,
      condition,
      instagramUsername: instagram,
      description: bookDetails.description,
      imageUrl: bookDetails.image,
      publishDate: bookDetails.publishedDate,
    };

    const result = await donateBook(donation);
    if (result.success) {
      toast.success("Thank you for donating the book!📚", {
        onClose: () => {
          resetForm();
          navigate("/inventory");
        },
      });
    } else {
      toast.error(
        result.error || "Error submitting donation. Please try again."
      );
    }
  };

  const resetForm = () => {
    setSearchQuery("");
    reset(); // Use the hook's reset function
    setCondition("");
    setInstagram("");
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

          {showIsbnHelp && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={assets.isbn}
                  alt="ISBN location on book"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">
                  The ISBN (International Standard Book Number) can be found on
                  the back cover of the book or on the copyright page. It's
                  typically a 10 or 13-digit number.
                </p>
              </div>
            </div>
          )}

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
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {searchError && (
        <div className="mt-4 text-red-500 text-sm">{searchError}</div>
      )}

      {bookDetails && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">{bookDetails.title}</h2>
          <p>
            <strong>Authors:</strong> {bookDetails.authors.join(", ")}
          </p>
          <p>
            <strong>Published:</strong> {bookDetails.publishedDate}
          </p>
          <p>
            <strong>Description:</strong> {bookDetails.description}
          </p>
          <img
            src={bookDetails.image}
            alt={bookDetails.title}
            className="mt-4 w-48 h-64 object-contain bg-gray-100 rounded-md"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x300";
            }}
          />
        </div>
      )}

      {bookDetails && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="book-condition"
              className="block text-sm font-medium text-gray-700"
            >
              Condition:
            </label>
            <select
              id="book-condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used-like-new">Used - Like New</option>
              <option value="used-readable">Used - Readable</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="instagram-username"
              className="block text-sm font-medium text-gray-700"
            >
              Instagram Username:
            </label>
            <input
              id="instagram-username"
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Your Instagram username"
              className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {donateError && (
            <div className="text-red-500 text-sm">{donateError}</div>
          )}

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Donate Book"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DonateBookForm;
