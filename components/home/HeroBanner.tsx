import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-brand-blue-700 to-brand-blue-500">
      <AnnouncementBar />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:px-8 lg:py-24">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            A Cleaner Home,
            <br />
            <span className="text-brand-orange-400">A Greener Planet</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-white/80 lg:mx-0 lg:mt-6">
            Eco-friendly home and cleaning products delivered to your
            door. Sustainable, effective, and affordable.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/shop"
              className="rounded-lg bg-brand-orange-500 px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-brand-orange-600"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="rounded-lg border-2 border-white px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto aspect-square max-w-md rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex h-full items-center justify-center rounded-xl bg-white/5">
              <svg
                className="h-32 w-32 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
