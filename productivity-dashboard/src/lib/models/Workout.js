import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Cardio", "Strength", "Yoga", "Sports", "Other"],
    },
    duration: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema);
