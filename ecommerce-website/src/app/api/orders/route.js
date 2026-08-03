import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function POST(request) {
  const body = await request.json();
  const { items, total, customer } = body;

  if (!items?.length || !total || !customer?.name || !customer?.address || !customer?.phone) {
    return Response.json({ error: "Missing order details" }, { status: 400 });
  }

  await connectDB();
  const order = await Order.create({ items, total, customer });

  return Response.json({ orderId: order._id }, { status: 201 });
}
