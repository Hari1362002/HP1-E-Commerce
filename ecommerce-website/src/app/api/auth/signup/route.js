import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { createSession } from "@/lib/session";

export async function POST(request) {
  const { name, email, password } = await request.json();

  // 1. Validate input before touching the database.
  if (!name?.trim() || !email?.trim() || !password) {
    return Response.json(
      { error: "Name, email and password are all required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  await connectDB();

  // 2. Reject duplicates so one email maps to one account.
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return Response.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  // 3. Hash the password. bcrypt salts automatically, so identical
  //    passwords produce different hashes and cannot be reversed.
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
  });

  // 4. Log the new user straight in by issuing a session cookie.
  await createSession(user._id.toString());

  return Response.json(
    { user: { id: user._id, name: user.name, email: user.email } },
    { status: 201 }
  );
}
