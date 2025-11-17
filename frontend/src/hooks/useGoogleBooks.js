import { useState } from "react";
import { googleBooksService } from "../api/googleBooks";

//Custom hook for searching books via Google Books API
export const useGoogleBooks = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchByISBN = async (isbn) => {
    if (!isbn?.trim()) {
      setError("Please enter an ISBN");
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await googleBooksService.searchByISBN(isbn);

      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        const imageLinks = book.imageLinks || {};

        const imageUrl =
          imageLinks.extraLarge ||
          imageLinks.large ||
          imageLinks.medium ||
          imageLinks.small ||
          imageLinks.thumbnail ||
          "https://via.placeholder.com/400";

        const bookInfo = {
          title: book.title,
          authors: book.authors || [],
          publishedDate: book.publishedDate || "N/A",
          description: book.description || "No description available.",
          image: imageUrl,
        };
        setBookDetails(bookInfo);
        return bookInfo;
      } else {
        setError("No results found for this ISBN");
        setBookDetails(null);
        return null;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Error fetching book details";
      setError(errorMessage);
      setBookDetails(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setBookDetails(null);
    setError(null);
  };

  return {
    bookDetails,
    isLoading,
    error,
    searchByISBN,
    reset,
  };
};
