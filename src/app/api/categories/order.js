import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { categories } = await req.json(); 
  for (let i = 0; i < categories.length; i++) {
    await Category.updateOne(
      { _id: categories[i]._id },
      { order: categories[i].order }
    );
  }
  return Response.json(true);
}
