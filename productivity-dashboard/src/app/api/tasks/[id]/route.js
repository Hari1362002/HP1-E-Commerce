import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/models/Task";

export async function PATCH(request, context) {
  const { id } = await context.params;
  const body = await request.json();
  await connectDB();
  const task = await Task.findByIdAndUpdate(id, body, { new: true });
  return Response.json(task);
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectDB();
  await Task.findByIdAndDelete(id);
  return Response.json({ ok: true });
}
