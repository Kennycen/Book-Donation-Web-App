import { useState, useEffect } from "react";
import { bookService } from "../api/books";

// Custom hook for fetching a single book by ID
export const useBook = (bookId) => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setIsLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await bookService.getById(bookId);
        setBook(data);
      } catch (error) {
        setError(
          error.response?.data?.error || error.message || "Book not found"
        );
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);
  return { book, isLoading, error };
};

// Custom hook for deleting a book 
export const useDeleteBook = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteBook = async (bookId) => {
    try {
      setIsDeleting(true);
      setError(null);
      await bookService.delete(bookId);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete book";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteBook, isDeleting, error };
};
