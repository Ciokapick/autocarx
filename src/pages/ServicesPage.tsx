import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Car, 
  Paintbrush, 
  Cog, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const services = [
    {
      icon: Wrench,
      title: "General Repairs",
      description: "Comprehensive repair services for all makes and models. From engine diagnostics to complete overhauls.",
      features: ["Engine Repair", "Transmission Service", "Brake Systems", "Suspension Work"]
    },
    {
      icon: Paintbrush,
      title: "Auto Body & Paint",
      description: "Expert collision repair and custom paint work. We restore your vehicle to factory-fresh condition.",
      features: ["Collision Repair", "Custom Paint Jobs", "Dent Removal", "Frame Straightening"]
    },
    {
      icon: Cog,
      title: "Maintenance",
      description: "Regular maintenance to keep your vehicle running at peak performance for years to come.",
      features: ["Oil Changes", "Tire Rotation", "Fluid Services", "Filter Replacement"]
    },
    {
      icon: Shield,
      title: "Detailing",
      description: "Professional interior and exterior detailing services to keep your car looking showroom new.",
      features: ["Exterior Wash & Wax", "Interior Deep Clean", "Leather Treatment", "Paint Protection"]
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Upgrade your vehicle's performance with our expert tuning and modification services.",
      features: ["ECU Tuning", "Exhaust Systems", "Intake Upgrades", "Turbo Installation"]
    },
    {
      icon: Car,
      title: "Restoration",
      description: "Complete classic and vintage car restoration. We bring automotive history back to life.",
      features: ["Full Restorations", "Engine Rebuilds", "Interior Restoration", "Parts Sourcing"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Our Services</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              Complete <span className="text-primary">Automotive Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From routine maintenance to complete restorations, we offer a full range of 
              automotive services to keep your vehicle in perfect condition.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
                >
                  Get Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              How We Work
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Discuss your needs and get an initial assessment" },
              { step: "02", title: "Inspection", desc: "Thorough vehicle inspection and diagnosis" },
              { step: "03", title: "Service", desc: "Expert work by certified technicians" },
              { step: "04", title: "Delivery", desc: "Quality check and vehicle handover" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contact us to discuss your specific requirements. We'll create a tailored service plan for your vehicle.
          </p>
          <Link to="/contact">
            <Button size="lg" className="uppercase tracking-wider font-bold">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
