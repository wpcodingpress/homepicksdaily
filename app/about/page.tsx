import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HomePicksDaily — our mission, values, and commitment to eco-friendly home products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-ink">About HomePicksDaily</h1>

      <div className="mt-8 space-y-6 text-ink-muted leading-relaxed">
        <p>
          At HomePicksDaily, we believe that a clean home shouldn&apos;t come at
          the cost of a clean planet. Our mission is to make eco-friendly living
          accessible, affordable, and effortless.
        </p>

        <p>
          We carefully curate every product in our collection — from reusable
          cleaning tools to biodegradable household essentials — so you can
          shop with confidence, knowing each item meets our standards for
          quality and sustainability.
        </p>

        <h2 className="font-heading text-2xl font-bold text-ink">
          Why Choose Us?
        </h2>

        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-brand-orange-500" />
            <span>
              <strong className="text-ink">Curated Selection:</strong> Every
              product is chosen for its eco-friendly credentials and real-world
              effectiveness.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-brand-orange-500" />
            <span>
              <strong className="text-ink">Affordable Pricing:</strong> Green
              living shouldn&apos;t be a luxury. We keep our prices competitive.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-brand-orange-500" />
            <span>
              <strong className="text-ink">Fast & Reliable:</strong> Tracked
              worldwide shipping with fast dispatch.
            </span>
          </li>
        </ul>

        <p>
          Whether you&apos;re taking your first steps toward a zero-waste
          lifestyle or looking to replace your current cleaning arsenal with
          sustainable alternatives, HomePicksDaily is here to help.
        </p>
      </div>
    </div>
  );
}
