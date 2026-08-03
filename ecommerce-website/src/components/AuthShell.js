import Image from "next/image";
import Link from "next/link";

/** Shared split layout for the login and signup screens. */
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
      <div className="order-2 lg:order-1">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-ink-900"
          >
            FURNI<span className="text-brand-500">CO</span>
          </Link>

          <h1 className="mt-8 text-3xl font-semibold text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-500">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-6 text-sm text-ink-500">{footer}</p>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200 lg:aspect-[4/5]">
          <Image
            src="/images/site/hero.jpg"
            alt="A styled living room with a mustard armchair and floor lamp"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Make you
              <br />
              <span className="text-brand-300">feel luxury</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-white/70">
              Furniture designed for the way you actually live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
