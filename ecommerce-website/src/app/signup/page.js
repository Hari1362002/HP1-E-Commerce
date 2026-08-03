import { Suspense } from "react";
import SignupForm from "./SignupForm";
import AuthFallback from "@/components/AuthFallback";

export const metadata = {
  title: "Sign up — HP",
};

/**
 * SignupForm reads `?next=` with useSearchParams, which opts it into
 * client-side rendering — so it has to sit inside a Suspense boundary for the
 * build to prerender this route.
 */
export default function SignupPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <SignupForm />
    </Suspense>
  );
}
