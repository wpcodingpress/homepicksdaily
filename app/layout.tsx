import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { Toaster } from '@/components/ui/Toast';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HomePicksDaily — Eco-Friendly Home & Cleaning Products',
  description: 'Discover 500+ eco-friendly home and cleaning products. Sustainable, effective, and affordable essentials for a cleaner, greener home.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://homepicksdaily.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://homepicksdaily.com',
    siteName: 'HomePicksDaily',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
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
        <Toaster />
      </body>
    </html>
  );
}
