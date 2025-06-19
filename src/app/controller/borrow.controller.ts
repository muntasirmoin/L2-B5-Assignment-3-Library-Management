import { Request, Response, Router } from "express";
import { borrow } from "../model/borrow.model";

export const borrowRoute = Router();

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
