import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getSessionUserId } from "@/lib/session";

/**
 * The client calls this on load to find out who (if anyone) is signed in.
 * The cookie is httpOnly, so the browser cannot read the session itself.
 */
export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return Response.json({ user: null });

  await connectDB();
  const user = await User.findById(userId).select("name email").lean();
  if (!user) return Response.json({ user: null });

  return Response.json({
    user: { id: user._id, name: user.name, email: user.email },
  });
}
