import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Other",
      ],
    },
    note: { type: String, default: "" },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
