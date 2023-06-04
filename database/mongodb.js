import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function mongodbClient() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB)
    .then((db) => console.log("mongodb connected."))
    .catch((err) => console.log(err));
}
