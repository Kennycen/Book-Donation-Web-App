import Book from "../models/Book.js";

export const donateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      condition,
      instagramUsername,
      description,
      imageUrl,
      publishDate,
    } = req.body;
    if (!title || !author || !isbn || !condition || !instagramUsername) {
      return res.status(400).json({
        error:
          "Required fields are missing. Please fill out the form completely.",
      });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      condition,
      instagramUsername,
      description,
      imageUrl,
      publishDate,
    });
    await newBook.save();
    res.status(201).json({ message: "Book donated successfully" });
  } catch (err) {
    console.error("Error in /donate endpoint:", err);
    res.status(500).json({ error: "Failed to donate book" });
  }
};

export const getLatestBook = async (req, res) => {
  try {
    const latestBooks = await Book.find().sort({ _id: -1 }).limit(4);
    res.status(200).json(latestBooks);
  } catch (err) {
    console.error("Error in /inventory/latest:", err);
    res.status(500).json({ error: "Failed to fetch latest books" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find().sort({ _id: -1 }).skip(skip).limit(limit),
      Book.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      books,
      currentPage: page,
      totalPages,
      totalBooks: total,
    });
  } catch (err) {
    console.error("Error in /inventory/all:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ isbn });

    if (book) {
      res.status(200).json([book]);
    } else {
      res
        .status(404)
        .json({ message: "No book found with this ISBN in our inventory" });
    }
  } catch (err) {
    console.error("Error in search endpoint:", err);
    res.status(500).json({ error: "Failed to search for book" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book details:", err);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
};
