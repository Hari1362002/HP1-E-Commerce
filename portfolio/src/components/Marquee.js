"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite ticker, driven by requestAnimationFrame rather than a CSS
 * animation.
 *
 * CSS was the obvious choice until it turned out phones freeze it: iOS ships
 * Reduce Motion on far more often than desktops do, and the media query that
 * honours it left the strip standing still. A ticker that never moves reads as
 * broken rather than considerate, so this one runs on rAF — outside the reach
 * of that query — and pauses on hover or touch instead.
 *
 * The list is rendered twice and the offset wraps at exactly half the track
 * width, so the seam always lands on an identical frame and never shows.
 */
export default function Marquee({ items, speed = 45 }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let offset = 0;
    let last = performance.now();
    let frame = 0;

    const step = (now) => {
      const elapsed = Math.min((now - last) / 1000, 0.05); // clamp tab-switch jumps
      last = now;

      if (!pausedRef.current) {
        const half = track.scrollWidth / 2;
        offset -= speed * elapsed;
        if (half > 0 && -offset >= half) offset += half;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const run = [...items, ...items];

  return (
    <div
      className="marquee overflow-hidden border-y border-rule py-4 select-none"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onPointerDown={pause}
      onPointerUp={resume}
      onPointerCancel={resume}
    >
      <div ref={trackRef} className="marquee-track">
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
