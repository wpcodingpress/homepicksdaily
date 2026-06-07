import HeroBanner from "@/components/home/HeroBanner";
import ValuePropositions from "@/components/home/ValuePropositions";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestsellerGrid from "@/components/home/BestsellerGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ValuePropositions />
      <FeaturedCategories />
      <BestsellerGrid />
      <HowItWorks />
      <Testimonials />
      <NewsletterSignup />
    </>
  );
}
