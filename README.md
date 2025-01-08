# Book Donation Platform

## Description
The Book Donation Platform is a web application designed to connect students through book donations and sharing. It provides a convenient platform where users can donate books they no longer need and find books to support their studies. The application fosters a culture of giving and reusing, reducing waste, and building a stronger community.

## Features
- User-friendly interface for donating and searching for books.
- Integration with Google Books API for book details.
- Responsive design for both desktop and mobile users.
- Inventory management for donated books.
- Toast notifications for user feedback.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Vercel for both frontend and backend

## Installation

### Prerequisites
- Node.js (>= 18.0.0)
- MongoDB (for local development)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set your environment variables:
   ```plaintext
   VITE_BACKEND_URL=your_backend_url_here
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set your environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=4000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage
- Access the frontend at `http://localhost:5173` (or your configured port).
- Use the application to donate books or search for available books.

## API Endpoints
- **POST** `/api/donate`: Donate a book.
- **GET** `/api/inventory/latest`: Fetch the latest 4 books.
- **GET** `/api/inventory/all`: Fetch all books with pagination.
- **GET** `/api/inventory/search/:isbn`: Search for a book by ISBN.
- **GET** `/api/books/:id`: Get a single book by ID.
- **DELETE** `/api/books/:id`: Delete a book by ID.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## Acknowledgments
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)