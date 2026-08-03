import { Suspense } from "react";
import LoginForm from "./LoginForm";
import AuthFallback from "@/components/AuthFallback";

export const metadata = {
  title: "Log in — NOOK",
};

/**
 * LoginForm reads `?next=` with useSearchParams, which opts it into client-side
 * rendering — so it has to sit inside a Suspense boundary for the build to
 * prerender this route.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <LoginForm />
    </Suspense>
  );
}
