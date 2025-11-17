# Book Donation Platform

## Description
The Book Donation Platform is a web application designed to connect students through book donations and sharing. It provides a convenient platform where users can donate books they no longer need and find books to support their studies. The application fosters a culture of giving and reusing, reducing waste, and building a stronger community.

## Features
- User-friendly interface for donating and searching for books.
- Integration with Google Books API for book details.
- Responsive design for both desktop and mobile users.
- Inventory management for donated books.
- Toast notifications for user feedback.
- Dynamic routing with multiple pages (Home, Inventory, Donate, Product).
- Custom React hooks for efficient data management.
- Pagination support for browsing large book collections.
- Book search functionality by ISBN.

## Tech Stack
- **Frontend**: 
  - React 18
  - Vite
  - Tailwind CSS
  - React Router DOM (v7)
  - Axios (for API calls)
  - Motion (for animations)
  - React Toastify (for notifications)
- **Backend**: 
  - Node.js (ES Modules)
  - Express
  - MongoDB with Mongoose
- **Deployment**: Vercel for both frontend and backend

## Installation

### Prerequisites
- Node.js (>= 18.0.0)
- MongoDB (for local development) or MongoDB Atlas connection string

### Frontend Setup
1. Navigate to the frontend directory:
   cd frontend
   2. Install dependencies:sh
   npm install
   3. Create a `.env` file and set your environment variables:
   
   VITE_BACKEND_URL=your_backend_url_here
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
   4. Start the development server:
   
   npm run dev
   ### Backend Setup
1. Navigate to the backend directory:h
   cd backend
   2. Install dependencies:sh
   npm install
   3. Create a `.env` file and set your environment variables:
   
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   4. Start the server:
   npm run dev
   ## Usage
- Access the frontend at `http://localhost:5173` (or your configured port).
- Use the application to donate books or search for available books.
- Browse the inventory to find books you need.
- View individual book details on the product page.

## API Endpoints

All endpoints are prefixed with `/api/v1`:

- **POST** `/api/v1/donate`: Donate a book.
- **GET** `/api/v1/inventory/latest`: Fetch the latest 4 books.
- **GET** `/api/v1/inventory/all`: Fetch all books with pagination (query params: `page`, `limit`).
- **GET** `/api/v1/inventory/search/:isbn`: Search for a book by ISBN.
- **GET** `/api/v1/books/:id`: Get a single book by ID.
- **DELETE** `/api/v1/books/:id`: Delete a book by ID.

## Frontend Routes

- `/` - Home page with hero section and recommended books
- `/inventory` - Browse all donated books with pagination
- `/donate` - Donate a book form with ISBN search
- `/product/:productId` - View individual book details

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.