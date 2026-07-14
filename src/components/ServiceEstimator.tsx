import { useMemo, useState } from "react";
import { ArrowUpRight, Calculator, Check, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { id: "oil", name: "Oil & filters", basePrice: 75, description: "Synthetic oil and filter baseline" },
  { id: "brakes", name: "Brake service", basePrice: 250, description: "Pads and rotor inspection" },
  { id: "diagnostics", name: "Diagnostics", basePrice: 120, description: "Computer scan and analysis" },
  { id: "tuning", name: "Performance tune", basePrice: 450, description: "ECU optimisation baseline" },
  { id: "suspension", name: "Suspension", basePrice: 350, description: "Dampers, geometry and alignment" },
  { id: "electrical", name: "Electrical", basePrice: 200, description: "Battery, charging and wiring" },
  { id: "transmission", name: "Transmission", basePrice: 300, description: "Fluid service and inspection" },
  { id: "ac", name: "Climate system", basePrice: 180, description: "Pressure test and leak detection" },
];

export const ServiceEstimator = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const estimate = useMemo(() => {
    const total = selected.reduce((sum, id) => sum + (services.find((service) => service.id === id)?.basePrice ?? 0), 0);
    return { min: Math.round(total * .9), max: Math.round(total * 1.1) };
  }, [selected]);

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const selectedNames = services.filter((service) => selected.includes(service.id)).map((service) => service.name).join(", ");
  const bookingUrl = `/contact?service=${encodeURIComponent(selectedNames)}&estimate=${estimate.min}-${estimate.max}`;

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute right-0 top-0 select-none text-[18vw] font-black uppercase leading-none text-white/[.018]">Estimate</div>
      <div className="container relative mx-auto px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-primary"><Calculator className="h-4 w-4" /> Quick estimator</div>
            <h2 className="text-4xl font-black uppercase leading-[.95] tracking-[-.045em] md:text-6xl">Build a first-pass scope.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Choose the work you are considering. This range is a planning aid; the final quote follows inspection, parts selection and the exact vehicle specification.</p>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {services.map((service, index) => {
                const isSelected = selected.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggle(service.id)}
                    className={`group flex min-h-32 items-start justify-between gap-5 bg-[#111] p-5 text-left transition hover:bg-[#181818] ${isSelected ? "inset-ring border-primary bg-primary/10" : ""}`}
                  >
                    <span>
                      <span className="mb-2 block text-sm font-bold uppercase tracking-wide">{service.name}</span>
                      <span className="block text-xs leading-5 text-muted-foreground">{service.description}</span>
                      <span className="mt-3 block text-xs font-semibold text-primary">From ${service.basePrice}</span>
                    </span>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center border ${isSelected ? "border-primary bg-primary" : "border-white/20"}`}>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex min-h-40 flex-col justify-between gap-6 border border-white/10 bg-[#0c0c0c] p-6 sm:flex-row sm:items-center">
              {selected.length ? (
                <>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/45">Indicative range</p>
                    <p className="mt-2 text-4xl font-black tracking-tight text-primary">${estimate.min}—${estimate.max}</p>
                    <button type="button" onClick={() => setSelected([])} className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-white/45 hover:text-white"><RotateCcw className="h-3 w-3" /> Clear selection</button>
                  </div>
                  <Link to={bookingUrl} className="inline-flex h-13 items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[.14em] transition hover:bg-primary/85">Request inspection <ArrowUpRight className="h-4 w-4" /></Link>
                </>
              ) : (
                <div>
                  <p className="font-bold uppercase">Choose one or more services</p>
                  <p className="mt-2 text-sm text-muted-foreground">Your indicative range will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
