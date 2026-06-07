"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 px-4 text-center">
      <h2 className="font-heading text-2xl font-bold text-ink">
        Something went wrong
      </h2>
      <p className="max-w-md text-ink-muted">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-600"
      >
        Try again
      </button>
    </div>
  );
}
