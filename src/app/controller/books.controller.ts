import express, { Request, Response } from "express";
import { books } from "../model/books.model";
export const booksRoute = express.Router();

// 1. Create Book

booksRoute.post("/", async (req: Request, res: Response, next) => {
  try {
    const body = req.body;
    const book = await books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// 2. Get All Books

booksRoute.get("/", async (req: Request, res: Response, next) => {
  try {
    // filter: Filter by genre
    const filterByGenre = req.query.filter;

    //  sortBy=createdAt
    const sortBy = req.query.sortBy;
    const sortAscOrDesc = req.query.sort;
    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sortAscOrDesc;
    }
    // limit: Number of results (default: 10)
    const limit = parseInt(req.query.limit as string) || 10;

    const data = await books
      .find({ genre: filterByGenre })
      .sort(sortOptions)
      .limit(limit);

    if (data.length === 0) {
      const error = new Error(`No Book Found with Genre: ${filterByGenre}`);
      (error as any).statusCode = 404;
      return next(error);
    }

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// 3. Get Book by ID
booksRoute.get("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const book_Id = req.params.bookId;

    const data = await books.findById(book_Id);

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// 4. Update Book
// PUT /api/books/:bookId

booksRoute.put("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const updateBookId = req.params.bookId;
    const updateBody = req.body;
    const data = await books.findByIdAndUpdate(updateBookId, updateBody, {
      new: true,
      runValidators: true,
    });
    console.log(updateBookId, updateBody, data);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// 5. Delete Book
// DELETE /api/books/:bookId

booksRoute.delete("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const deleteBookId = req.params.bookId;
    const data = await books.findByIdAndDelete(deleteBookId, { new: true });

    if (!data) {
      const error = new Error(`No Book Found with bookId: ${deleteBookId}`);
      (error as any).statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});
