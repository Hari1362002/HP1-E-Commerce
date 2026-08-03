import { connectDB } from "@/lib/mongodb";
import Expense from "@/lib/models/Expense";

export async function GET() {
  await connectDB();
  const expenses = await Expense.find({}).sort({ date: -1 }).lean();
  return Response.json(expenses);
}

export async function POST(request) {
  const body = await request.json();
  const { amount, category, note, date } = body;

  if (!amount || !category || !date) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const expense = await Expense.create({ amount, category, note, date });
  return Response.json(expense, { status: 201 });
}
