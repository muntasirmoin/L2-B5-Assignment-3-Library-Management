import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controller/books.controller";
import { globalErrorhandler } from "./app/middlewares/globalErrorHandler";
import { borrowRoute } from "./app/controller/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute);

app.use(globalErrorhandler);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to library Management App");
});

export default app;
