import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Cog, Gauge, Zap, Settings, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Regular oil changes, fluid checks, and preventive maintenance to keep your vehicle running smoothly and extend its lifespan.",
    },
    {
      icon: Cog,
      title: "Engine Diagnostics",
      description: "Advanced computer diagnostics to identify and resolve engine problems quickly using state-of-the-art scanning equipment.",
    },
    {
      icon: Gauge,
      title: "Performance Tuning",
      description: "Custom tuning services to optimize your vehicle's performance, horsepower, and fuel efficiency for peak driving experience.",
    },
    {
      icon: Zap,
      title: "Electrical Systems",
      description: "Complete electrical system repair including battery, alternator, starter, wiring, and lighting system diagnostics and service.",
    },
    {
      icon: Settings,
      title: "Brake Services",
      description: "Complete brake system maintenance including pad replacement, rotor resurfacing, brake fluid service, and brake line repairs.",
    },
    {
      icon: Shield,
      title: "Tire Services",
      description: "Tire installation, balancing, rotation, and alignment services to ensure optimal performance, safety, and tire longevity.",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-[#111] py-24 md:py-32">
      {/* Background Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[180px] font-bold opacity-[0.02] whitespace-nowrap pointer-events-none select-none">
        SERVICES
      </div>

      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <div className="mb-16 animate-fade-in text-center">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest font-medium text-primary">
              Services
            </span>
          </div>
          <h2 className="mx-auto max-w-3xl text-4xl font-black uppercase leading-[.95] tracking-[-.04em] md:text-6xl">
            One workshop. Every critical system.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">From preventive care to a complete build, each service starts with a diagnosis and a scope you can understand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group animate-fade-in rounded-none border-white/10 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-12 flex h-14 w-14 items-center justify-center border border-primary/30 bg-primary/5 transition-colors group-hover:bg-primary/15">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold uppercase">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
