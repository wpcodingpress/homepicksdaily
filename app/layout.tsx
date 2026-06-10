import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400','500','600','700','800','900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HomePicksDaily — Eco-Friendly Home & Cleaning Products',
  description: 'Discover 500+ eco-friendly home and cleaning products. Sustainable, effective, and affordable.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://homepicksdaily.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'HomePicksDaily',
    images: [{ url: '/home-page-header-desktop.gif', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
