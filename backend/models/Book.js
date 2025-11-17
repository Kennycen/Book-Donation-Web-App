import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    condition: { type: String, required: true },
    instagramUsername: { type: String, required: true },
    description: String,
    imageUrl: String,
    publishDate: String,
  },
  { timestamp: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
