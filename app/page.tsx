import Hero from "@/app/components/sections/Hero";
import Features from "@/app/components/sections/Features";
import Testimonials from "@/app/components/sections/Testimonials";
import FAQ from "@/app/components/sections/FAQ";
import CTA from "@/app/components/sections/CTA";
import About from "./components/sections/About";
import HowItWorks from "./components/sections/HowItWorks";
import Pricing from "./components/sections/Pricing";
import Screenshots from "./components/sections/Screenshots";
import Contact from "./components/sections/Contact";

export const metadata = {
  title: "Gadiyo - Revolutionary Mobile Experience",
  description:
    "Transform your mobile experience with Gadiyo. Download now for iOS and Android.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <HowItWorks />
      <Pricing />
      <Screenshots />
      <CTA />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
