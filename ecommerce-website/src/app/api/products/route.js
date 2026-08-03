import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { seedProducts } from "@/data/seedProducts";

export async function GET() {
  await connectDB();

  let products = await Product.find({}).sort({ createdAt: 1 }).lean();

  if (products.length === 0) {
    await Product.insertMany(seedProducts);
    products = await Product.find({}).sort({ createdAt: 1 }).lean();
  }

  return Response.json(products);
}
