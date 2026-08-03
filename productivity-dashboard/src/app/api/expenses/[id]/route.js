import { connectDB } from "@/lib/mongodb";
import Expense from "@/lib/models/Expense";

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectDB();
  await Expense.findByIdAndDelete(id);
  return Response.json({ ok: true });
}
