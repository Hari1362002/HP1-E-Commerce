import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add it to .env.local — see README.md."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Signs a JWT holding only the user id. Never put the password or any
 * sensitive field in here — the payload is readable by anyone with the token.
 */
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + MAX_AGE_SECONDS * 1000);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, // JS on the page cannot read it — blocks XSS token theft
    secure: process.env.NODE_ENV === "production", // https-only in production
    sameSite: "lax", // not sent on cross-site POSTs — blocks basic CSRF
    expires: expiresAt,
    path: "/",
  });
}

/** Returns the signed-in user's id, or null when there is no valid session. */
export async function getSessionUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.userId ?? null;
  } catch {
    // Expired or tampered token — treat as signed out.
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
