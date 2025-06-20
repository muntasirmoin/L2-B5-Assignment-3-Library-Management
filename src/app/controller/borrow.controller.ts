import { Request, Response, Router } from "express";
import { borrow } from "../model/borrow.model";

export const borrowRoute = Router();

// 6. Borrow a Book

borrowRoute.post("/", async (req: Request, res: Response, next) => {
  try {
    const borrowBody = req.body;

    const data = await borrow.create(borrowBody);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// 7. Borrowed Books Summary (Using Aggregation)
borrowRoute.get("/", async (req: Request, res: Response, next) => {
  try {
    const data = await borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
