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
      aria-label="NOOK — home"
      className={`font-display font-semibold tracking-tight text-ink-900 ${SIZES[size]}`}
    >
      N<span className="text-brand-500">OOK</span>
    </Link>
  );
}
