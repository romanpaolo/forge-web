import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Metrics from "@/components/sections/Metrics";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <Features />
      <Metrics />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
