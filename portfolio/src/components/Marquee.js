/**
 * Infinite ticker. The list is rendered twice and the track slides exactly
 * -50%, so the seam lands on an identical frame and never shows.
 */
export default function Marquee({ items }) {
  const run = [...items, ...items];

  return (
    <div className="marquee mt-4 overflow-hidden border-y border-rule py-4 select-none">
      <div className="marquee-track">
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="display flex shrink-0 items-center gap-6 px-6 text-2xl text-ink/80 sm:text-3xl"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
