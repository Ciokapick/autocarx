import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Target, Wrench, Car } from "lucide-react";

import workshopImage from "@/assets/about/service.png";
import teamMember1 from "@/assets/projects/bmw-m4.jpg";
import teamMember2 from "@/assets/projects/porsche-911.jpg";
import teamMember3 from "@/assets/projects/nissan-gtr.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every repair and service we provide."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We treat every customer like family."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "On-time delivery and transparent communication throughout the process."
    },
    {
      icon: Target,
      title: "Precision",
      description: "State-of-the-art equipment and skilled technicians for accurate results."
    }
  ];

  const team = [
    {
      name: "Marcus Johnson",
      role: "Master Technician",
      experience: "15+ Years Experience",
      image: teamMember1
    },
    {
      name: "Sarah Chen",
      role: "Service Manager",
      experience: "12+ Years Experience",
      image: teamMember2
    },
    {
      name: "David Rodriguez",
      role: "Paint Specialist",
      experience: "10+ Years Experience",
      image: teamMember3
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm animate-fade-in-up animate-stagger-1">About Us</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 animate-fade-in-up animate-stagger-2">
              We're Passionate About <span className="text-primary">Automotive Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-stagger-3">
              With over 20 years of experience, we've built our reputation on quality craftsmanship, 
              honest service, and a genuine love for automobiles.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <span className="text-primary font-semibold uppercase tracking-widest text-sm">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                From Humble Beginnings to Industry Leaders
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2004, AutoCar X started as a small garage with a big dream. Our founder, 
                James Mitchell, had a vision to create an auto service center that combined old-school 
                craftsmanship with cutting-edge technology.
              </p>
              <p className="text-muted-foreground mb-8">
                Today, we've grown into a full-service automotive center, handling everything from 
                routine maintenance to complete restorations. Our team of certified technicians 
                brings decades of combined experience to every project.
              </p>
              <div className="flex gap-8">
                <div className="animate-scale-in animate-stagger-1">
                  <div className="text-4xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="animate-scale-in animate-stagger-2">
                  <div className="text-4xl font-bold text-primary">15K+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Cars Serviced</div>
                </div>
                <div className="animate-scale-in animate-stagger-3">
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="aspect-square rounded-lg overflow-hidden hover-lift">
                <img 
                  src={workshopImage} 
                  alt="Our workshop and garage facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-lg -z-10 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm animate-fade-in-up animate-stagger-1">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 animate-fade-in-up animate-stagger-2">
              Comprehensive Automotive Solutions
            </h2>
            <p className="text-muted-foreground mt-4 animate-fade-in-up animate-stagger-3">
              From routine maintenance to complex repairs, we provide expert automotive services 
              with state-of-the-art equipment and genuine parts.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-1">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Wrench className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Engine Repair & Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete engine diagnostics, repair, and maintenance using advanced diagnostic equipment.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Engine Diagnostics</li>
                <li>• Oil & Filter Changes</li>
                <li>• Timing Belt Replacement</li>
                <li>• Engine Rebuilding</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-2">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Car className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Brake System Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete brake inspections, repairs, and replacements for optimal safety and performance.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Brake Pad Replacement</li>
                <li>• Rotor Resurfacing</li>
                <li>• Brake Fluid Service</li>
                <li>• ABS System Repair</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-3">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transmission Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Expert transmission maintenance, repair, and rebuild services for all vehicle types.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transmission Fluid Change</li>
                <li>• Transmission Repair</li>
                <li>• Clutch Replacement</li>
                <li>• Transmission Rebuild</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-4">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Paint & Body Work</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional paint matching, collision repair, and cosmetic restoration services.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Paint Matching & Touch-up</li>
                <li>• Collision Repair</li>
                <li>• Dent Removal</li>
                <li>• Full Paint Jobs</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-5">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tire & Wheel Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete tire services including installation, balancing, alignment, and tire repairs.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tire Installation</li>
                <li>• Wheel Balancing</li>
                <li>• Alignment Service</li>
                <li>• Tire Repair</li>
              </ul>
            </div>
            
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group card-hover animate-fade-in-up animate-stagger-6">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Regular Maintenance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Comprehensive preventive maintenance to keep your vehicle running smoothly and reliably.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Scheduled Maintenance</li>
                <li>• Fluid Inspections</li>
                <li>• Battery Testing</li>
                <li>• Multi-Point Inspections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm animate-fade-in-up animate-stagger-1">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 animate-fade-in-up animate-stagger-2">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors card-hover animate-fade-in-up animate-stagger-${index + 1}`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm animate-fade-in-up animate-stagger-1">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 animate-fade-in-up animate-stagger-2">
              Meet The Experts
            </h2>
            <p className="text-muted-foreground mt-4 animate-fade-in-up animate-stagger-3">
              Our certified technicians have worked on thousands of vehicles, from classic cars to modern supercars.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marcus Johnson - Master Technician */}
            <div className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover animate-fade-in-up animate-stagger-1">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={teamMember1} 
                  alt="Marcus Johnson with BMW M4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{team[0].name}</h3>
                    <p className="text-primary font-medium">{team[0].role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{team[0].experience}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">Cars Worked On:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">BMW M4</div>
                      <div className="text-muted-foreground text-xs">Engine Rebuilds</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Mustang 67</div>
                      <div className="text-muted-foreground text-xs">Restorations</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Audi RS6</div>
                      <div className="text-muted-foreground text-xs">Turbo Service</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Nissan GT-R</div>
                      <div className="text-muted-foreground text-xs">Performance</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cars Serviced:</span>
                    <span className="font-bold text-primary">2,500+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sarah Chen - Service Manager */}
            <div className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover animate-fade-in-up animate-stagger-2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={teamMember2} 
                  alt="Sarah Chen with Porsche 911"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{team[1].name}</h3>
                    <p className="text-primary font-medium">{team[1].role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{team[1].experience}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">Cars Worked On:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Porsche 911</div>
                      <div className="text-muted-foreground text-xs">Maintenance</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Ferrari 458</div>
                      <div className="text-muted-foreground text-xs">Diagnostics</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Chevelle SS</div>
                      <div className="text-muted-foreground text-xs">Consultation</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Supra MK4</div>
                      <div className="text-muted-foreground text-xs">Tuning</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customers Served:</span>
                    <span className="font-bold text-primary">1,800+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* David Rodriguez - Paint Specialist */}
            <div className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover animate-fade-in-up animate-stagger-3">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={teamMember3} 
                  alt="David Rodriguez with Nissan GT-R"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{team[2].name}</h3>
                    <p className="text-primary font-medium">{team[2].role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{team[2].experience}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">Cars Worked On:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Nissan GT-R</div>
                      <div className="text-muted-foreground text-xs">Paint Matching</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">BMW M4</div>
                      <div className="text-muted-foreground text-xs">Body Work</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Porsche 911</div>
                      <div className="text-muted-foreground text-xs">Restoration</div>
                    </div>
                    <div className="bg-secondary/50 rounded p-2 text-center hover-lift">
                      <div className="font-medium">Ferrari 458</div>
                      <div className="text-muted-foreground text-xs">Custom Paint</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paint Jobs:</span>
                    <span className="font-bold text-primary">950+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up animate-stagger-1">
            Ready to Experience the Difference?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in-up animate-stagger-2">
            Join thousands of satisfied customers who trust us with their vehicles.
          </p>
          <Button size="lg" className="uppercase tracking-wider font-bold animate-scale-in animate-stagger-3 hover-lift">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
