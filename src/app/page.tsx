import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/sections/Navbar";
import Hero3D from "@/components/sections/Hero3D";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import SampleWalkDemo from "@/components/sections/SampleWalkDemo";
import Differentiation from "@/components/sections/Differentiation";
import CaseStudyTeaser from "@/components/sections/CaseStudyTeaser";
import Testimonials from "@/components/sections/Testimonials";
import AndroidWaitlist from "@/components/sections/AndroidWaitlist";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

// Homepage per PRD 9.2–9.9 (in order): hero → stat bar (inside hero) →
// problem → product detail → how-it-works → try-it demo → differentiation →
// case-study teaser (10.5/10.7) → Will testimonial → final CTA.
// AndroidWaitlist renders only behind NEXT_PUBLIC_ANDROID_WAITLIST=true
// (TCPA review pending, Open Item #10).
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <Hero3D />
        <Problem />
        <Features />
        <HowItWorks />
        <SampleWalkDemo />
        <Differentiation />
        <CaseStudyTeaser />
        <Testimonials />
        <AndroidWaitlist />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
