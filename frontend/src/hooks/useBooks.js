import { useState, useEffect, useCallback } from "react";
import { bookService } from "../api/books";

// Custom hook for fetching paginated books
export const useBooks = (page = 1, limit = 20, enabled = true) => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await bookService.getAll(currentPage, limit);

      setBooks(data.books);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      setError(
        error.response?.data?.error || error.message || "Failed to fetch books"
      );
      console.error("Error fetching books", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, enabled]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    totalPages,
    currentPage,
    isLoading,
    error,
    refetch: fetchBooks,
    setCurrentPage,
  };
};

// Custom hook for fetching latest books
export const useLatestBooks = (limit = 4) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await bookService.getLatest(limit);

        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to fetch latest books"
        );
        console.error("Error fetching latest books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestBooks();
  }, [limit]);
  return { books, isLoading, error };
};
