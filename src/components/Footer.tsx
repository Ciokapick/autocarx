import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#080808]">
    <div className="container mx-auto px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-3xl font-black tracking-[-.05em]">AUTOCAR<span className="text-primary">X</span></Link>
          <h2 className="mt-8 max-w-xl text-3xl font-black uppercase leading-tight md:text-5xl">Your car. A sharper standard.</h2>
          <Link to="/contact" className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-primary">Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
        </div>
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">Explore</p>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <Link to="/projects" className="hover:text-white">Projects</Link>
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/about" className="hover:text-white">Approach</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">Workshop</p>
          <p className="text-sm leading-7 text-white/60">Bucharest<br />Visits by appointment<br />Project enquiries online</p>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.14em] text-white/30 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} AutoCar X</span>
        <span>Built around the machine</span>
      </div>
    </div>
  </footer>
);

export default Footer;
