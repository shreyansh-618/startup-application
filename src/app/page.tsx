import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TermsSection from "@/components/TermsSection";
import WhoWePick from "@/components/WhoWePick";
import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <TermsSection />
        <WhoWePick />
        <ApplicationForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
