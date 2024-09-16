
import configs from "@/config";
import mongoose from "mongoose";
export async function connectToDB() {
  try {
    await mongoose.connect(`${configs.MONGODB_URL}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
