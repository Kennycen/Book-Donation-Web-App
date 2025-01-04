import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

export const submitBookForm = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error submitting book form:', error);
    throw error;
  }
};
