"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import MobileNav from "./MobileNav";
import AnnouncementBar from "./AnnouncementBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const categoryLinks = [
  { href: "/category/kitchen-starter-kits", label: "Kitchen" },
  { href: "/category/home-storage-organization", label: "Storage" },
  { href: "/category/home-garden", label: "Garden" },
  { href: "/category/refill-solutions", label: "Refill" },
  { href: "/category/toys-hobbies", label: "Toys" },
  { href: "/category/kitchendining-bar", label: "Dining" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const catTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[#1C1C2E] shadow-lg backdrop-blur-lg"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-heading text-xl font-extrabold tracking-tight sm:text-[22px]">
              <span className="text-[#FF5722]">Home</span>
              <span className={`${scrolled ? "text-[#00BCD4]" : "text-[#1C1C2E]"}`}>Picks</span>
              <span className={`${scrolled ? "text-white" : "text-[#1C1C2E]"}`}>Daily</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#FF5722] after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-white hover:text-[#FF5722]" : "text-[#1C1C2E] hover:text-[#FF5722]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(catTimeout.current);
                setCatOpen(true);
              }}
              onMouseLeave={() => {
                catTimeout.current = setTimeout(() => setCatOpen(false), 200);
              }}
            >
              <button
                className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#FF5722] after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-white hover:text-[#FF5722]" : "text-[#1C1C2E] hover:text-[#FF5722]"
                }`}
              >
                Categories
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${catOpen ? "rotate-90" : ""}`} />
              </button>
              {catOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-[500px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-fadeIn"
                  onMouseEnter={() => {
                    clearTimeout(catTimeout.current);
                    setCatOpen(true);
                  }}
                  onMouseLeave={() => {
                    catTimeout.current = setTimeout(() => setCatOpen(false), 200);
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {categoryLinks.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#1C1C2E] transition-all hover:bg-[#FFF3F0] hover:text-[#FF5722]"
                      >
                        <ChevronRight className="w-4 h-4 text-[#00BCD4]" />
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled ? "text-white hover:bg-white/10" : "text-[#1C1C2E] hover:bg-gray-100"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={openCart}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled ? "text-white hover:bg-white/10" : "text-[#1C1C2E] hover:bg-gray-100"
              }`}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5722] text-[10px] font-bold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
                scrolled ? "text-white hover:bg-white/10" : "text-[#1C1C2E] hover:bg-gray-100"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-16 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <Search className={`w-5 h-5 flex-shrink-0 ${scrolled ? "text-white/60" : "text-gray-400"}`} />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={`flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-sm ${
                  scrolled ? "text-white placeholder:text-white/50" : "text-[#1C1C2E] placeholder:text-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className={`text-sm font-medium ${
                  scrolled ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-[#1C1C2E]"
                }`}
              >
                ESC
              </button>
            </form>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        links={[...navLinks, { href: "/category/home-garden", label: "Categories" }]}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
