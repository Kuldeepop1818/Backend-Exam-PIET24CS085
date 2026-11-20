const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

// POST /books - Add a new book
router.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({
      message: "Book created successfully",
      book
    });
  } catch (error) {
    return next(error);
  }
});

// GET /books - Get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
});

// GET /books/:id - Get one book
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
});

// PUT /books/:id - Update a book
router.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    return next(error);
  }
});

// DELETE /books/:id - Delete a book
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
