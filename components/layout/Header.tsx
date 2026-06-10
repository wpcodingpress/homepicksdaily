'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import AnnouncementBar from './AnnouncementBar';
import MobileNav from './MobileNav';

interface WCCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<WCCategory[]>([]);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore(s => s.itemCount());
  const openCart = useCartStore(s => s.openCart);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        const filtered = (data as WCCategory[])
          .filter(c => c.slug !== 'uncategorized' && c.count > 0)
          .slice(0, 10);
        setCategories(filtered);
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
            <Link href="/" style={{ display:'flex', alignItems:'center', flexShrink:0, textDecoration:'none' }}>
              <Image
                src="/logo.png"
                alt="HomePicksDaily"
                width={260}
                height={78}
                style={{
                  objectFit: 'contain',
                  height: 'clamp(50px, 6vw, 78px)',
                  width: 'auto',
                  maxWidth: '260px',
                }}
                priority
              />
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
                    ? '#F5811F'
                    : scrolled ? 'rgba(255,255,255,0.85)' : '#0F1923',
                  transition:'all 0.2s ease',
                  position:'relative',
                }}>
                  {label}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <li ref={dropdownRef} style={{ listStyle:'none', position:'relative' }}
                onMouseEnter={() => setCatDropdownOpen(true)}
                onMouseLeave={() => setCatDropdownOpen(false)}
              >
                <button
                  onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                  style={{
                    padding:'0.5rem 1rem',
                    borderRadius:'0.5rem',
                    fontSize:'0.9375rem',
                    fontWeight:500,
                    fontFamily:'var(--font-body)',
                    color: scrolled ? 'rgba(255,255,255,0.85)' : '#0F1923',
                    display:'flex', alignItems:'center', gap:'0.25rem',
                    cursor:'pointer', border:'none', background:'none',
                  }}
                >
                  Categories <ChevronDown size={14} style={{
                    transform: catDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease',
                  }} />
                </button>

                {catDropdownOpen && categories.length > 0 && (
                  <div style={{
                    position:'absolute', top:'100%', left:'0', marginTop:'0.5rem',
                    minWidth:'220px',
                    background: scrolled ? 'rgba(15,15,26,0.97)' : 'white',
                    backdropFilter:'blur(20px)',
                    border: scrolled
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid var(--color-light-border)',
                    borderRadius:'0.75rem',
                    boxShadow:'0 16px 48px rgba(0,0,0,0.2)',
                    overflow:'hidden',
                    padding:'0.5rem',
                    zIndex:100,
                  }}>
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCatDropdownOpen(false)}
                        style={{
                          display:'flex', alignItems:'center', justifyContent:'space-between',
                          padding:'0.625rem 0.875rem',
                          borderRadius:'0.5rem',
                          fontSize:'0.875rem',
                          fontFamily:'var(--font-body)',
                          fontWeight:500,
                          color: scrolled ? 'rgba(255,255,255,0.8)' : '#0F1923',
                          transition:'all 0.15s ease',
                          textDecoration:'none',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(245,129,31,0.08)';
                          (e.currentTarget as HTMLElement).style.color = '#F5811F';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = scrolled ? 'rgba(255,255,255,0.8)' : '#0F1923';
                        }}
                      >
                        <span>{cat.name}</span>
                        <span style={{
                          fontSize:'0.6875rem',
                          color: scrolled ? 'rgba(255,255,255,0.4)' : 'var(--color-text-muted)',
                          background: scrolled ? 'rgba(255,255,255,0.08)' : 'var(--color-light-muted)',
                          padding:'0.125rem 0.5rem',
                          borderRadius:'1rem',
                        }}>
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                    <div style={{
                      borderTop: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-light-border)',
                      marginTop:'0.25rem', paddingTop:'0.375rem',
                    }}>
                      <Link href="/shop" onClick={() => setCatDropdownOpen(false)}
                        style={{
                          display:'flex', alignItems:'center', justifyContent:'center',
                          padding:'0.5rem 0.875rem',
                          borderRadius:'0.5rem',
                          fontSize:'0.8125rem',
                          fontFamily:'var(--font-heading)',
                          fontWeight:700,
                          color: '#F5811F',
                          textDecoration:'none',
                        }}
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            </nav>

            {/* Right Actions */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(15,15,26,0.06)',
                  color: scrolled ? 'white' : '#0F1923',
                  transition:'all 0.2s ease',
                }}
              >
                <Search size={18} />
              </button>

              <button
                onClick={openCart}
                style={{
                  position:'relative',
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: '#F5811F',
                  color:'white',
                  transition:'all 0.2s ease',
                  boxShadow:'0 4px 16px rgba(245,129,31,0.35)',
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

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden"
                style={{
                  width:'40px', height:'40px',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(15,15,26,0.06)',
                  color: scrolled ? 'white' : '#0F1923',
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

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
                    border: '2px solid #F5811F',
                    fontSize:'0.9375rem',
                    fontFamily:'var(--font-body)',
                    outline:'none',
                    background: scrolled ? 'rgba(255,255,255,0.1)' : 'white',
                    color: scrolled ? 'white' : '#0F1923',
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding:'0.75rem 1.25rem' }}>
                  <Search size={18} />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)}
                  style={{ color: scrolled ? 'white' : '#0F1923', padding:'0 0.5rem' }}>
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} categories={categories} />
    </>
  );
}
