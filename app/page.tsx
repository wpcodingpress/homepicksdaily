import HeroSlider from '@/components/home/HeroSlider';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import ValuePropositions from '@/components/home/ValuePropositions';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestsellerGrid from '@/components/home/BestsellerGrid';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import StatsSection from '@/components/home/StatsSection';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import { getProducts, getCategories } from '@/lib/woocommerce';

export default async function HomePage() {
  const { products } = await getProducts({ per_page: '8' });
  const categories = await getCategories();

  return (
    <>
      <HeroSlider />
      <MarqueeBanner />
      <ValuePropositions />
      <FeaturedCategories categories={categories} />
      <BestsellerGrid products={products} />
      <HowItWorks />
      <Testimonials />
      <StatsSection />
      <NewsletterSignup />
    </>
  );
}
