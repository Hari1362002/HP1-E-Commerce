import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { seedProducts } from "@/data/seedProducts";

/**
 * Loads the catalogue, seeding it on first run so a fresh clone has
 * something to show without a separate seed script.
 */
export async function getProducts() {
  await connectDB();
  let products = await Product.find({}).sort({ createdAt: 1 }).lean();

  if (products.length === 0) {
    await Product.insertMany(seedProducts);
    products = await Product.find({}).sort({ createdAt: 1 }).lean();
  }

  return JSON.parse(JSON.stringify(products));
}

export async function getProductBySlug(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}
