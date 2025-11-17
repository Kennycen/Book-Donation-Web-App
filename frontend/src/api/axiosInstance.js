import axios from "axios"

// Backend API instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const googleBooksClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    }
    return Promise.reject(error);
  }
);

