import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(request, context) {
  const { id } = await context.params;
  await connectDB();

  const product = await Product.findOne({
    $or: [{ slug: id }, ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])],
  }).lean();

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
