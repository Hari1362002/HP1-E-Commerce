import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { createSession } from "@/lib/session";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email?.trim() || !password) {
    return Response.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // Same message whether the email is unknown or the password is wrong —
  // otherwise the response tells an attacker which emails are registered.
  const invalid = Response.json(
    { error: "Incorrect email or password." },
    { status: 401 }
  );

  if (!user) return invalid;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return invalid;

  await createSession(user._id.toString());

  return Response.json({
    user: { id: user._id, name: user.name, email: user.email },
  });
}
