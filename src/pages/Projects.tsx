import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Clock } from "lucide-react";
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
              <button
                key={project.id}
                type="button"
                aria-label={`View details for ${project.title}`}
                className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary/20 transition-colors duration-300 group-hover:border-primary/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
                    <span>View project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-h-[86svh] w-[calc(100%-2rem)] max-w-5xl overflow-hidden border-border bg-background p-0 shadow-2xl [&>button]:z-30 [&>button]:rounded-full [&>button]:bg-background/95 [&>button]:p-2 [&>button]:text-foreground [&>button]:opacity-100 [&>button]:shadow-md [&>button]:backdrop-blur-sm">
          {selectedProject && (
            <div className="max-h-[86svh] overflow-y-auto lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:overflow-hidden">
              <div className="relative h-56 overflow-hidden sm:h-72 lg:h-[86svh]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:from-background/70" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3 lg:bottom-8 lg:left-8">
                  <span className="rounded-full border border-primary/30 bg-background/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                    {selectedProject.category}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {selectedProject.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-8 p-6 sm:p-8 lg:max-h-[86svh] lg:overflow-y-auto lg:p-10">
                <div className="space-y-4 pr-8">
                  <DialogTitle className="text-3xl font-bold leading-tight sm:text-4xl">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                    {selectedProject.longDescription}
                  </DialogDescription>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold">Project specifications</h3>
                  <dl className="grid grid-cols-2 gap-3">
                    {selectedProject.specs.map((spec) => (
                      <div key={spec.label} className="rounded-xl border border-border bg-secondary/20 p-4">
                        <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {spec.label}
                        </dt>
                        <dd className="font-bold leading-snug text-foreground">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold">Project timeline</h3>
                  <ol>
                    {selectedProject.steps.map((step, index) => (
                      <li
                        key={step.title}
                        className="grid grid-cols-[2rem_1fr] gap-4 border-t border-border py-4 first:border-t-0 first:pt-0"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <h4 className="mb-1 font-bold">{step.title}</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col items-start gap-4 border-t border-border pt-6">
                  <div>
                    <h4 className="text-xl font-bold">Ready to start your project?</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Tell us about your vehicle and what you want to achieve.
                    </p>
                  </div>
                  <Button asChild size="lg">
                    <Link to="/contact" onClick={() => setSelectedProject(null)}>
                      Get Your Quote
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
