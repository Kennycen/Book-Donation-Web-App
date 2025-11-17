import { apiClient } from "./axiosInstance";

export const bookService = {
  getAll: async (page = 1, limit = 20) => {
    const response = await apiClient.get("/api/v1/inventory/all", {
      params: { page, limit },
    });
    return response.data;
  },

  getLatest: async (limit = 4) => {
    const response = await apiClient.get("/api/v1/inventory/latest");
    return response.data;
  },

  getById: async (bookId) => {
    const response = await apiClient.get(`/api/v1/books/${bookId}`);
    return response.data;
  },

  searchByISBN: async (isbn) => {
    const response = await apiClient.get(`/api/v1/inventory/search/${isbn}`);
    return response.data;
  },

  donate: async (bookData) => {
    const response = await apiClient.post("/api/v1/donate", bookData);
    return response.data;
  },

  delete: async (bookId) => {
    const response = await apiClient.delete(`/api/v1/books/${bookId}`);
    return response.data;
  },
};
