import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interface/books.interface";
import { boolean, string } from "zod";
import { IBorrow } from "../interface/borrow.interface";

const booksSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

booksSchema.statics.updateCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("book not found");
  }
  if (book.copies < quantity) {
    throw new Error(`not enough copies available! Copies : ${book.copies}`);
  }
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();
};

export const books = model<IBook, BookModel>("books", booksSchema);
