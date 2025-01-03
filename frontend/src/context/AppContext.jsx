import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const requiredEnvVars = {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    VITE_GOOGLE_BOOKS_API_KEY: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
  };

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      console.error(`Missing required environment variable: ${key}`);
    }
  });

  const appConfig = {
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    googleBooks: {
      apiKey: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
      baseUrl: 'https://www.googleapis.com/books/v1/volumes'
    },
    isDevelopment: import.meta.env.DEV
  };

  return (
    <AppContext.Provider value={appConfig}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 