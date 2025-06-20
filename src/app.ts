import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controller/books.controller";
import { globalErrorhandler } from "./app/middlewares/globalErrorHandler";
import { borrowRoute } from "./app/controller/borrow.controller";
import { notFoundHandler } from "./app/middlewares/notFoundHandler";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to library Management App");
});

app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute);

app.use(notFoundHandler);

app.use(globalErrorhandler);

export default app;
