import Navbar from "../layout/navbar";
import Hero from "../landing/HeroSection";
import HowItWorks from "../landing/HowItWorks";
import Footer from "../layout/footer";
import About from "../landing/About";
import Features from "../landing/Features";
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <About />
      <hr />
      <Footer />
    </>
  );
}