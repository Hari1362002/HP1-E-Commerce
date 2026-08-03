import Link from "next/link";

const SIZES = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export default function Logo({ size = "md", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="HP — home"
      className={`font-display font-semibold tracking-tight text-ink-900 ${SIZES[size]}`}
    >
      H<span className="text-brand-500">P</span>
    </Link>
  );
}
