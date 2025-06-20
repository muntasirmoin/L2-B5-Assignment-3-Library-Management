import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { number } from "zod";
import { books } from "./books.model";

const schemaBorrow = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be Positive integer"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be Positive integer",
      },
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Verify the book has enough available copies.
// Deduct the requested quantity from the book’s copies.
// If copies become 0, update available to false (implement this using a static method or instance method).
// Save the borrow record with all relevant details.

schemaBorrow.pre("save", async function (next) {
  try {
    const borrow = this as IBorrow;
    // const book = await books.findById(borrow.book);
    // if (!book) {
    //   throw new Error("book not found");
    // }
    // if (book.copies < borrow.quantity) {
    //   throw new Error(`not enough copies available! Copies : ${book.copies}`);
    // }
    // book.copies -= borrow.quantity;
    // if (book.copies === 0) {
    //   book.available = false;
    // }
    // await book.save();

    await books.updateCopies(borrow.book.toString(), borrow.quantity);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const borrow = model<IBorrow>("borrows", schemaBorrow);
