import express from "express";
import { deleteBook, donateBook, getAllBooks, getBookById, getBookByISBN, getLatestBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

// Donate a book
bookRouter.post("/donate", donateBook);

// Fetch the latest 4 books
bookRouter.get("/inventory/latest", getLatestBook);

// Fetch all books
bookRouter.get("/inventory/all", getAllBooks);

// Add this new route for searching books by ISBN
bookRouter.get("/inventory/search/:isbn", getBookByISBN);

// Add this new route to get a single book by ID
bookRouter.get("/books/:id", getBookById);

// Add delete book endpoint
bookRouter.delete("/books/:id", deleteBook);

export default bookRouter;
