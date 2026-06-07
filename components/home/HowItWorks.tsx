const steps = [
  {
    step: "1",
    title: "Browse & Choose",
    description: "Explore our curated collection of eco-friendly home products.",
  },
  {
    step: "2",
    title: "Place Your Order",
    description: "Add to cart and checkout securely via PayPal.",
  },
  {
    step: "3",
    title: "Enjoy Your Home",
    description: "Fast shipping straight to your door. Clean green, live better.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface-light py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-ink">
            How It Works
          </h2>
          <p className="mt-2 text-ink-muted">
            Three simple steps to a cleaner home
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange-500 text-2xl font-extrabold text-white">
                {s.step}
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-ink-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
