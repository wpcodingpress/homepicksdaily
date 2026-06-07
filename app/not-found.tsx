import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-ink">404</h1>
      <p className="max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-600"
      >
        Go home
      </Link>
    </div>
  );
}
