import { ArrowDown, ArrowUpRight, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import heroCarImage from "@/assets/hero-car.jpg";
import heroVideo from "@/assets/hero.mp4";

const Hero = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 md:items-center md:pb-0">
      <div className="absolute inset-0">
        <img src={heroCarImage} alt="Red performance car in the AutoCar X workshop" className="h-full w-full object-cover object-center" />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster={heroCarImage}
          onEnded={() => setVideoEnded(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${videoEnded ? "opacity-0" : "opacity-100"}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.96)_0%,rgba(8,8,8,.82)_43%,rgba(8,8,8,.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="autocar-grain absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <div className="max-w-3xl animate-fade-in">
          <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-primary">
            <span className="h-px w-12 bg-primary" />
            Precision workshop · Bucharest
          </div>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[.91] tracking-[-.055em] md:text-7xl lg:text-[92px]">
            Built for cars you refuse to <span className="text-primary">compromise</span> on.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg">
            Diagnostics, restoration and performance work planned around the car—not a generic checklist. Start with a clear conversation, then see every decision take shape.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex h-14 items-center justify-center gap-3 bg-primary px-7 text-sm font-bold uppercase tracking-[.13em] text-primary-foreground transition hover:bg-primary/85">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/projects" className="inline-flex h-14 items-center justify-center border border-white/25 bg-black/20 px-7 text-sm font-bold uppercase tracking-[.13em] backdrop-blur transition hover:border-white hover:bg-white hover:text-black">
              Explore the builds
            </Link>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/15 pt-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white/55 sm:text-xs">
            <span className="flex items-center gap-2"><Gauge className="h-4 w-4 text-primary" /> Diagnostics</span>
            <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-primary" /> Restoration</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Performance</span>
          </div>
        </div>
      </div>

      <a href="#featured-work" className="absolute bottom-8 right-8 z-10 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/55 lg:flex">
        Selected work <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
};

export default Hero;
