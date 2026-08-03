import { connectDB } from "@/lib/mongodb";
import Workout from "@/lib/models/Workout";

export async function GET() {
  await connectDB();
  const workouts = await Workout.find({}).sort({ date: -1 }).lean();
  return Response.json(workouts);
}

export async function POST(request) {
  const body = await request.json();
  const { type, duration, calories, date } = body;

  if (!type || !duration || !date) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const workout = await Workout.create({ type, duration, calories, date });
  return Response.json(workout, { status: 201 });
}
