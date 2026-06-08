'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown, Leaf, Package, Home, Phone, Info } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import AnnouncementBar from './AnnouncementBar';
import MobileNav from './MobileNav';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: Package },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const itemCount = useCartStore(s => s.itemCount());
  const openCart = useCartStore(s => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <header
        className="sticky top-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? 'rgba(15,15,26,0.97)'
            : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(15,15,26,0.06)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.3)'
            : '0 2px 20px rgba(0,0,0,0.04)',
        }}
      >
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'72px', gap:'2rem' }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration:'none', flexShrink:0 }}>
              <span style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(18px,2.5vw,24px)', fontWeight:900, letterSpacing:'-0.02em' }}>
                <span style={{ color:'#FF5722' }}>Home</span>
                <span style={{ color: scrolled ? '#00BCD4' : '#0F0F1A' }}>Picks</span>
                <span style={{ color: scrolled ? 'rgba(255,255,255,0.7)' : '#0F0F1A' }}>Daily</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display:'flex', alignItems:'center', gap:'0.25rem', flex:1, justifyContent:'center' }}
              className="hidden md:flex">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  padding:'0.5rem 1rem',
                  borderRadius:'0.5rem',
                  fontSize:'0.9375rem',
                  fontWeight: 500,
                  fontFamily:'var(--font-body)',
                  color: pathname === href
                    ? '#FF5722'
                    : scrolled ? 'rgba(255,255,255,0.85)' : '#0F0F1A',
                  transition:'all 0.2s ease',
                  position:'relative',
                }}>
                  {label}
                </Link>
              ))}
              <Link href="/shop" style={{
                padding:'0.5rem 1rem',
                borderRadius:'0.5rem',
                fontSize:'0.9375rem',
                fontWeight:500,
                fontFamily:'var(--font-body)',
                color: scrolled ? 'rgba(255,255,255,0.85)' : '#0F0F1A',
                display:'flex', alignItems:'center', gap:'0.25rem',
              }}>
                Categories <ChevronDown size={14} />
              </Link>
            </nav>

            {/* Right Actions */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(15,15,26,0.06)',
                  color: scrolled ? 'white' : '#0F0F1A',
                  transition:'all 0.2s ease',
                }}
              >
                <Search size={18} />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                style={{
                  position:'relative',
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: '#FF5722',
                  color:'white',
                  transition:'all 0.2s ease',
                  boxShadow:'0 4px 16px rgba(255,87,34,0.35)',
                }}
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span style={{
                    position:'absolute', top:'-6px', right:'-6px',
                    background:'#00BCD4',
                    color:'white',
                    fontSize:'10px', fontWeight:700,
                    width:'20px', height:'20px',
                    borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    border:'2px solid white',
                  }}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden"
                style={{
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(15,15,26,0.06)',
                  color: scrolled ? 'white' : '#0F0F1A',
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: scrolled ? 'rgba(15,15,26,0.97)' : 'white',
            padding:'1rem',
          }}>
            <div className="container">
              <form action="/search" method="get" style={{ display:'flex', gap:'0.5rem' }}>
                <input
                  name="q"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search eco-friendly products..."
                  autoFocus
                  style={{
                    flex:1,
                    padding:'0.75rem 1rem',
                    borderRadius:'0.625rem',
                    border: '2px solid #FF5722',
                    fontSize:'0.9375rem',
                    fontFamily:'var(--font-body)',
                    outline:'none',
                    background: scrolled ? 'rgba(255,255,255,0.1)' : 'white',
                    color: scrolled ? 'white' : '#0F0F1A',
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding:'0.75rem 1.25rem' }}>
                  <Search size={18} />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)}
                  style={{ color: scrolled ? 'white' : '#0F0F1A', padding:'0 0.5rem' }}>
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
