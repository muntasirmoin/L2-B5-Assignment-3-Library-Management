import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { number } from "zod";

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

export const borrow = model<IBorrow>("borrows", schemaBorrow);
