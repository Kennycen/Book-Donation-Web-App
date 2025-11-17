import { useState } from "react";
import { bookService } from "../api/books";

export const useDonateBook = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const donateBook = async (bookData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const data = await bookService.donate(bookData);
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Error submitting donation";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { donateBook, isSubmitting, error };
};
