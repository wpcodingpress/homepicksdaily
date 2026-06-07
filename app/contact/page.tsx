import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with HomePicksDaily. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-ink">
        Contact Us
      </h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-ink">
            Get in Touch
          </h2>
          <p className="text-ink-muted">
            Have a question about a product, your order, or anything else?
            We&apos;re here to help.
          </p>

          <div className="space-y-3 text-sm text-ink-muted">
            <p>
              <strong className="block text-ink">Email</strong>
              support@homepicksdaily.com
            </p>
            <p>
              <strong className="block text-ink">Hours</strong>
              Monday – Friday, 9:00 AM – 6:00 PM EST
            </p>
            <p>
              <strong className="block text-ink">Response Time</strong>
              We aim to reply within 24 hours.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-surface-light p-6">
          <p className="text-sm text-ink-muted">
            For now, please email us directly at{" "}
            <a
              href="mailto:support@homepicksdaily.com"
              className="font-semibold text-brand-orange-500 hover:text-brand-orange-600"
            >
              support@homepicksdaily.com
            </a>
            . We&apos;re working on adding a contact form soon!
          </p>
        </div>
      </div>
    </div>
  );
}
