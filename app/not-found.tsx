import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-[#1C1C2E] py-32 px-4 text-center">
      <h1 className="font-heading text-8xl font-black text-[#FF5722] sm:text-[120px]">
        404
      </h1>

      <div className="mb-4">
        <svg className="mx-auto h-20 w-20 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>

      <h2 className="font-heading text-3xl font-bold text-white">
        Page not found
      </h2>
      <p className="max-w-md text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF5722] px-8 py-3 font-bold text-white transition-all hover:bg-[#FF7043]"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#00BCD4] px-8 py-3 font-bold text-[#00BCD4] transition-all hover:bg-[#00BCD4] hover:text-white"
        >
          <ShoppingBag className="w-5 h-5" />
          Shop Products
        </Link>
      </div>
    </div>
  );
}
