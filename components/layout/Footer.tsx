import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?orderby=date", label: "New Arrivals" },
  { href: "/shop?on_sale=true", label: "Sale" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/order-confirmation", label: "Order Status" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-blue-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-heading text-xl font-extrabold tracking-tight"
            >
              HomePicksDaily
            </Link>
            <p className="mt-3 text-sm text-white/60">
              Eco-friendly home and cleaning products for a greener,
              cleaner home.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-white/80">
              Shop
            </h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-white/80">
              Info
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>support@homepicksdaily.com</li>
              <li>Mon–Fri, 9am–6pm EST</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} HomePicksDaily. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
