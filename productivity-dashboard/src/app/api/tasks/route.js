import { connectDB } from "@/lib/mongodb";
import Task from "@/lib/models/Task";

export async function GET() {
  await connectDB();
  const tasks = await Task.find({}).sort({ createdAt: -1 }).lean();
  return Response.json(tasks);
}

export async function POST(request) {
  const body = await request.json();
  const { title, description, dueDate, priority } = body;

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  await connectDB();
  const task = await Task.create({ title, description, dueDate, priority });
  return Response.json(task, { status: 201 });
}
