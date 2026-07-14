import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  ["01", "Inspect", "We begin with the symptoms, the car and the intended outcome."],
  ["02", "Plan", "You receive a scoped recommendation before work starts."],
  ["03", "Build", "The work is documented, measured and checked as it progresses."],
  ["04", "Deliver", "Final validation, a clear handover and the next-care plan."],
];

const Process = () => (
  <section className="bg-[#0c0c0c] py-24 md:py-32">
    <div className="container mx-auto px-5 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.24em] text-primary">How it works</p>
          <h2 className="text-4xl font-black uppercase leading-[.95] tracking-[-.045em] md:text-6xl">No mystery between intake and ignition.</h2>
          <Link to="/contact" className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-primary">
            Talk through your car <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="border-t border-white/15">
          {steps.map(([number, title, description]) => (
            <div key={number} className="grid gap-4 border-b border-white/15 py-8 sm:grid-cols-[60px_150px_1fr] sm:items-start">
              <span className="text-xs font-semibold tracking-[.2em] text-primary">{number}</span>
              <h3 className="text-xl font-bold uppercase">{title}</h3>
              <p className="max-w-lg text-sm leading-7 text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Process;
