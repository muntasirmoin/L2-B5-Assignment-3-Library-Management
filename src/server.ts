import mongoose from "mongoose";
import config from "./config";
import app from "./app";
// import { connectDB } from "./config/mongooseConnectDB";
let server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL!);
    // await connectDB();

    console.log("Library Management Connected to mongodb using mongoes");
    server = app.listen(config.PORT, () => {
      console.log(`Library Management Running on port ${config.PORT || 5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
