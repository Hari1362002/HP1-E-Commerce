import { connectDB } from "@/lib/mongodb";
import Workout from "@/lib/models/Workout";

export async function DELETE(request, context) {
  const { id } = await context.params;
  await connectDB();
  await Workout.findByIdAndDelete(id);
  return Response.json({ ok: true });
}
