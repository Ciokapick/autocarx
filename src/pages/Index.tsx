import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import { ServiceEstimator } from "@/components/ServiceEstimator";
import Footer from "@/components/Footer";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import Process from "@/components/Process";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <ProjectSpotlight />
      <Services />
      <Process />
      <ServiceEstimator />
      <Footer />
    </div>
  );
};

export default Index;
