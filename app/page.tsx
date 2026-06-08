import HeroBanner from "@/components/home/HeroBanner";
import BrandMarquee from "@/components/home/BrandMarquee";
import ValuePropositions from "@/components/home/ValuePropositions";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestsellerGrid from "@/components/home/BestsellerGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import StatsSection from "@/components/home/StatsSection";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { getProducts } from "@/lib/woocommerce";

export default async function HomePage() {
  const { products } = await getProducts({
    per_page: "8",
    orderby: "popularity",
  });

  return (
    <>
      <HeroBanner />
      <BrandMarquee />
      <ValuePropositions />
      <FeaturedCategories />
      <BestsellerGrid initialProducts={products} />
      <HowItWorks />
      <Testimonials />
      <StatsSection />
      <NewsletterSignup />
    </>
  );
}
