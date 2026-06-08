"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-[#1C1C2E]">
        Something went wrong
      </h1>
      <p className="max-w-md text-[#6B7280]">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-[#FF5722] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#FF7043]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-[#1C1C2E] transition-colors hover:bg-gray-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
