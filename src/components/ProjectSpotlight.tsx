import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import mustang from "@/assets/projects/mustang-67.jpg";
import porsche from "@/assets/projects/porsche-911.jpg";
import audi from "@/assets/projects/audi-rs6.jpg";

const projects = [
  { title: "1967 Mustang", type: "Frame-off restoration", image: mustang, number: "01" },
  { title: "Porsche 911", type: "Engine rebuild", image: porsche, number: "02" },
  { title: "Audi RS6", type: "Widebody conversion", image: audi, number: "03" },
];

const ProjectSpotlight = () => (
  <section id="featured-work" className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-5 md:px-8">
      <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.24em] text-primary">Selected work</p>
          <h2 className="max-w-3xl text-4xl font-black uppercase leading-[.95] tracking-[-.045em] md:text-6xl">The work speaks before we do.</h2>
        </div>
        <Link to="/projects" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em]">
          Open project journal <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {projects.map((project, index) => (
          <Link key={project.title} to="/projects" className={`group relative min-h-[440px] overflow-hidden ${index === 0 ? "lg:col-span-6" : "lg:col-span-3"}`}>
            <img src={project.image} alt={`${project.title} — ${project.type}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <span className="absolute left-6 top-6 text-xs font-semibold tracking-[.2em] text-white/60">{project.number}</span>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-primary">{project.type}</p>
                <h3 className="text-2xl font-bold uppercase tracking-tight">{project.title}</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectSpotlight;
