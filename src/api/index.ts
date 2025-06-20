import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";
import { connectDB } from "../config/mongooseConnectDB";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();
    app(req as any, res as any);
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
