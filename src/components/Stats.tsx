import { ScanLine, SquareStack, Workflow } from "lucide-react";

const facts = [
  { icon: SquareStack, value: "08", label: "build stories in the workshop journal" },
  { icon: ScanLine, value: "08", label: "service lines in the instant estimator" },
  { icon: Workflow, value: "1:1", label: "planning from diagnosis to delivery" },
];

const Stats = () => (
  <section className="border-y border-white/10 bg-[#0c0c0c]">
    <div className="container mx-auto grid md:grid-cols-3">
      {facts.map(({ icon: Icon, value, label }, index) => (
        <div key={label} className={`flex items-center gap-5 px-6 py-8 md:px-8 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}>
          <Icon className="h-6 w-6 shrink-0 text-primary" />
          <span className="text-3xl font-black tracking-tight">{value}</span>
          <span className="max-w-[180px] text-[10px] font-medium uppercase leading-5 tracking-[.15em] text-white/45">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
