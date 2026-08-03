import { getCategoryVisual } from "@/lib/categoryVisuals";

export default function ProductVisual({ category, className = "" }) {
  const { gradient, icon } = getCategoryVisual(category);

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-1/3 w-1/3 opacity-90"
      >
        <path d={icon} />
      </svg>
    </div>
  );
}
