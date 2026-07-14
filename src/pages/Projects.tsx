import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle, Clock, Wrench, Star, Zap, Target } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import mustang67 from "@/assets/projects/mustang-67.jpg";
import bmwM4 from "@/assets/projects/bmw-m4.jpg";
import porsche911 from "@/assets/projects/porsche-911.jpg";
import nissanGtr from "@/assets/projects/nissan-gtr.jpg";
import chevelleSs from "@/assets/projects/chevelle-ss.jpg";
import audiRs6 from "@/assets/projects/audi-rs6.jpg";
import ferrari458 from "@/assets/projects/ferrari-458.jpg";
import supraMk4 from "@/assets/projects/supra-mk4.jpg";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  image: string;
  longDescription: string;
  steps: { title: string; description: string }[];
  specs: { label: string; value: string }[];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ["all", "restoration", "custom", "repair", "performance"];

  const projects: Project[] = [
    {
      id: 1,
      title: "1967 Mustang Restoration",
      category: "restoration",
      description: "Complete frame-off restoration of a classic Ford Mustang",
      duration: "8 months",
      image: mustang67,
      longDescription: "This iconic 1967 Ford Mustang underwent a complete frame-off restoration, bringing it back to its original glory while adding subtle modern upgrades for reliability. Every component was carefully restored or replaced with period-correct parts.",
      steps: [
        { title: "Initial Assessment", description: "Complete disassembly and documentation of all components" },
        { title: "Frame Restoration", description: "Media blasting, rust repair, and protective coating application" },
        { title: "Body Work", description: "Panel repair, gap alignment, and preparation for paint" },
        { title: "Paint Application", description: "Original Candy Apple Red with clear coat protection" },
        { title: "Engine Rebuild", description: "289 V8 complete rebuild with period-correct upgrades" },
        { title: "Final Assembly", description: "Reassembly with restored and new components" }
      ],
      specs: [
        { label: "Year", value: "1967" },
        { label: "Engine", value: "289 V8" },
        { label: "Color", value: "Candy Apple Red" },
        { label: "Transmission", value: "4-Speed Manual" }
      ]
    },
    {
      id: 2,
      title: "BMW M4 Custom Build",
      category: "custom",
      description: "Full body kit, custom paint, and performance upgrades",
      duration: "3 months",
      image: bmwM4,
      longDescription: "A modern BMW M4 transformed into a show-stopping machine with a full widebody kit, custom matte grey wrap, and extensive performance modifications to match the aggressive looks.",
      steps: [
        { title: "Design Consultation", description: "Client meetings to finalize vision and specifications" },
        { title: "Body Kit Installation", description: "Carbon fiber widebody kit fitting and mounting" },
        { title: "Paint Prep", description: "Surface preparation and primer application" },
        { title: "Custom Wrap", description: "Matte grey vinyl wrap with accents" },
        { title: "Performance Upgrades", description: "Intake, exhaust, and ECU tune installation" },
        { title: "Finishing Touches", description: "Wheel fitment, suspension setup, and detailing" }
      ],
      specs: [
        { label: "Year", value: "2021" },
        { label: "Engine", value: "S58 Twin-Turbo I6" },
        { label: "Power", value: "550 HP" },
        { label: "Kit", value: "Widebody Carbon Fiber" }
      ]
    },
    {
      id: 3,
      title: "Porsche 911 Engine Rebuild",
      category: "repair",
      description: "Complete engine overhaul and restoration to factory specs",
      duration: "6 weeks",
      image: porsche911,
      longDescription: "A comprehensive engine rebuild for this Porsche 911 Turbo S, addressing wear issues and restoring factory performance. Every internal component was inspected, measured, and replaced as needed.",
      steps: [
        { title: "Diagnosis", description: "Compression testing and fault identification" },
        { title: "Engine Removal", description: "Careful extraction and transport to clean room" },
        { title: "Disassembly", description: "Complete teardown with documentation" },
        { title: "Machining", description: "Cylinder honing and crankshaft inspection" },
        { title: "Rebuild", description: "Assembly with new seals, bearings, and gaskets" },
        { title: "Testing", description: "Dyno testing and break-in procedure" }
      ],
      specs: [
        { label: "Year", value: "2019" },
        { label: "Engine", value: "3.8L Flat-6 Twin-Turbo" },
        { label: "Original Power", value: "640 HP" },
        { label: "Result", value: "Factory Spec Restored" }
      ]
    },
    {
      id: 4,
      title: "Nissan GTR Performance",
      category: "performance",
      description: "1000HP build with turbo upgrade and ECU tuning",
      duration: "4 months",
      image: nissanGtr,
      longDescription: "This R35 GTR was transformed into a 1000HP monster capable of dominating both the street and track. Full forged internals, upgraded turbos, and custom tuning deliver reliable power.",
      steps: [
        { title: "Engine Teardown", description: "Complete VR38 disassembly for inspection" },
        { title: "Forged Internals", description: "Installation of forged pistons, rods, and crankshaft" },
        { title: "Turbo Upgrade", description: "GTX3582R Gen II turbochargers installation" },
        { title: "Fuel System", description: "E85 conversion with upgraded injectors and pumps" },
        { title: "ECU Tuning", description: "Custom dyno tuning for maximum performance" },
        { title: "Testing", description: "Street and track validation" }
      ],
      specs: [
        { label: "Year", value: "2017" },
        { label: "Power", value: "1000 HP" },
        { label: "Torque", value: "850 lb-ft" },
        { label: "0-60", value: "2.4 seconds" }
      ]
    },
    {
      id: 5,
      title: "1970 Chevelle SS Restore",
      category: "restoration",
      description: "Matching numbers restoration with original parts",
      duration: "12 months",
      image: chevelleSs,
      longDescription: "A numbers-matching 1970 Chevelle SS 454 restored to concours condition. Every effort was made to source original or NOS parts to maintain authenticity and maximum value.",
      steps: [
        { title: "Documentation", description: "VIN decode and numbers matching verification" },
        { title: "Disassembly", description: "Complete teardown with cataloging" },
        { title: "Parts Sourcing", description: "Locating NOS and correct date-coded parts" },
        { title: "Body Restoration", description: "Metal work and paint in original Forest Green" },
        { title: "Drivetrain", description: "LS6 454 rebuild to factory specifications" },
        { title: "Assembly", description: "Final assembly with concours-level detail" }
      ],
      specs: [
        { label: "Year", value: "1970" },
        { label: "Engine", value: "LS6 454" },
        { label: "Power", value: "450 HP" },
        { label: "Color", value: "Forest Green" }
      ]
    },
    {
      id: 6,
      title: "Audi RS6 Widebody",
      category: "custom",
      description: "Custom widebody kit with air suspension",
      duration: "2 months",
      image: audiRs6,
      longDescription: "This Audi RS6 Avant received a complete makeover with a custom widebody conversion, air suspension system, and blacked-out theme for an aggressive yet sophisticated appearance.",
      steps: [
        { title: "Design", description: "3D modeling of custom wide fenders" },
        { title: "Fabrication", description: "Carbon fiber widebody panels creation" },
        { title: "Installation", description: "Body modifications and panel fitting" },
        { title: "Air Suspension", description: "Airlift Performance 3P system install" },
        { title: "Wheels & Tires", description: "22-inch forged wheels with proper fitment" },
        { title: "Final Touches", description: "Blacked-out trim and ceramic coating" }
      ],
      specs: [
        { label: "Year", value: "2022" },
        { label: "Power", value: "621 HP" },
        { label: "Suspension", value: "Airlift 3P" },
        { label: "Wheels", value: "22-inch Forged" }
      ]
    },
    {
      id: 7,
      title: "Ferrari 458 Collision Repair",
      category: "repair",
      description: "Major collision repair with paint correction",
      duration: "8 weeks",
      image: ferrari458,
      longDescription: "After a significant front-end collision, this Ferrari 458 required extensive aluminum bodywork, structural repairs, and paint matching to restore it to pre-accident condition.",
      steps: [
        { title: "Damage Assessment", description: "Structural scan and repair estimate" },
        { title: "Frame Repair", description: "Aluminum frame straightening on jig" },
        { title: "Panel Replacement", description: "OEM panel sourcing and installation" },
        { title: "Paint Matching", description: "Computer color matching for Rosso Corsa" },
        { title: "Paint Application", description: "Basecoat and clearcoat in downdraft booth" },
        { title: "Final Inspection", description: "Quality control and road testing" }
      ],
      specs: [
        { label: "Year", value: "2014" },
        { label: "Color", value: "Rosso Corsa" },
        { label: "Damage", value: "Front-End Collision" },
        { label: "Result", value: "Restored to Pre-Accident" }
      ]
    },
    {
      id: 8,
      title: "Supra MK4 Build",
      category: "performance",
      description: "2JZ swap with full forged internals",
      duration: "5 months",
      image: supraMk4,
      longDescription: "The legendary Toyota Supra MK4 built to its full potential with a fully built 2JZ-GTE, single turbo conversion, and supporting modifications for reliable 800+ horsepower.",
      steps: [
        { title: "Engine Removal", description: "2JZ-GTE extraction for rebuild" },
        { title: "Internal Build", description: "Forged internals and head work" },
        { title: "Single Turbo", description: "Precision 6766 turbo conversion" },
        { title: "Fuel System", description: "E85 fuel system upgrade" },
        { title: "Transmission", description: "CD009 6-speed swap" },
        { title: "Tuning", description: "Haltech ECU install and dyno tune" }
      ],
      specs: [
        { label: "Year", value: "1994" },
        { label: "Engine", value: "2JZ-GTE" },
        { label: "Power", value: "850 HP" },
        { label: "Turbo", value: "Precision 6766" }
      ]
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Our Projects</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              Featured <span className="text-primary">Work</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of completed projects. From classic restorations to 
              modern performance builds, see what we can do for your vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl overflow-hidden mb-6 border border-border/30 hover:border-primary/40 hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Modern Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                      <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                        View Project Details
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                      <Star className="w-3 h-3" />
                      {project.category}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1 bg-secondary/30 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 h-1 bg-secondary/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </div>
                    <span className="text-xs text-primary font-medium">100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-background border-0 shadow-2xl p-0">
          {selectedProject && (
            <div className="relative">
              {/* Full Width Hero Image Section */}
              <div className="relative h-80 md:h-[500px] overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent" />
                
                {/* Transparent Info Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent h-32 flex items-end">
                  <div className="p-8 w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/20 px-6 py-3 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
                        <Star className="w-4 h-4" />
                        {selectedProject.category}
                      </span>
                      <span className="text-sm text-foreground flex items-center gap-2 bg-secondary/70 px-4 py-3 rounded-full w-fit backdrop-blur-sm">
                        <Clock className="w-4 h-4" /> 
                        <span className="font-medium">{selectedProject.duration}</span>
                      </span>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground drop-shadow-lg">
                      {selectedProject.title}
                    </DialogTitle>
                  </div>
                </div>
              </div>

              {/* Content Section with Custom Scrollbar */}
              <div className="p-8 md:p-12 space-y-10 max-h-[calc(95vh-500px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary/30">
                <style>{`
                  .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                  }
                  .scrollbar-thumb-primary::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0.7));
                    border-radius: 4px;
                  }
                  .scrollbar-thumb-primary::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, hsl(var(--primary) / 0.8), hsl(var(--primary)));
                  }
                  .scrollbar-track-secondary\\/30::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                  }
                `}</style>
                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Modern Specs Grid */}
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    <span>Project Specifications</span>
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedProject.specs.map((spec, index) => (
                      <div 
                        key={index} 
                        className="group relative bg-gradient-to-br from-secondary/30 to-secondary/10 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            {spec.label}
                          </div>
                          <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {spec.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Process Steps */}
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-primary" />
                    <span>Project Timeline</span>
                  </h3>
                  <div className="space-y-4">
                    {selectedProject.steps.map((step, index) => (
                      <div 
                        key={index}
                        className="group relative bg-gradient-to-r from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative flex items-start gap-6">
                          {/* Step Number with modern styling */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                              <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                            </div>
                            {index < selectedProject.steps.length - 1 && (
                              <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent transform -translate-x-1/2 hidden lg:block" />
                            )}
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                          
                          {/* Status Icon */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <CheckCircle className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modern CTA Section */}
                <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-secondary/20" />
                  <div className="relative flex flex-col lg:flex-row items-center gap-6 justify-between">
                    <div className="text-center lg:text-left">
                      <h4 className="text-2xl font-bold mb-2">Ready to Start Your Project?</h4>
                      <p className="text-muted-foreground max-w-md">
                        Transform your vehicle with our expert craftsmanship and attention to detail.
                      </p>
                    </div>
                    <Link to="/contact" onClick={() => setSelectedProject(null)}>
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-3"
                      >
                        Get Your Quote
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground uppercase tracking-wider text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground uppercase tracking-wider text-sm">Full Restorations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground uppercase tracking-wider text-sm">Custom Builds</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground uppercase tracking-wider text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want Your Car Featured Here?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Let's discuss your project and make your automotive dreams a reality.
          </p>
          <Link to="/contact">
            <Button size="lg" className="uppercase tracking-wider font-bold">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
