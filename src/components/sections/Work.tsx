'use client'
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { cn } from "@/lib/utils";

const cats = ["All", "Dev", "Design", "Automation"] as const;

const projects = [
  { title: "Lumen CRM", cat: "Dev", year: "2026", stack: ["Next", "Supabase", "Stripe"], grad: "from-violet-500/40 to-fuchsia-500/30" },
  { title: "Orbit Brand Kit", cat: "Design", year: "2025", stack: ["Figma", "Logo", "Print"], grad: "from-amber-400/40 to-orange-500/30" },
  { title: "InboxZero Flow", cat: "Automation", year: "2025", stack: ["n8n", "OpenAI", "Gmail"], grad: "from-emerald-400/40 to-teal-500/30" },
  { title: "Folio v3", cat: "Dev", year: "2025", stack: ["React", "Three.js"], grad: "from-rose-400/40 to-pink-500/30" },
  { title: "Sage Identity", cat: "Design", year: "2024", stack: ["Brand", "Web"], grad: "from-sky-400/40 to-cyan-500/30" },
  { title: "Lead-gen Pipeline", cat: "Automation", year: "2024", stack: ["n8n", "HubSpot"], grad: "from-indigo-400/40 to-blue-500/30" },
];

function TiltCard({ p }: { p: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT({ x: -py * 8, y: px * 8 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass glass-hover transition-transform duration-200"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", p.grad)} />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute right-4 top-4 rounded-full bg-black/30 px-2 py-1 font-mono text-[10px] backdrop-blur">
        {p.year}
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/70">{p.cat}</div>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{p.title}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="pill-glow rounded-full px-2 py-0.5 font-mono text-[10px] text-foreground">{s}</span>
          ))}
        </div>
      </div>
      <div className="absolute right-5 top-5 translate-y-2 rounded-full bg-primary p-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
}

export function Work() {
  const [active, setActive] = useState<typeof cats[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="work" className="relative px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="03"
          label="Selected work"
          title={"Projects that\nactually shipped."}
          subtitle="A small slice. Each one solved a real problem and lived in production."
        />
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                active === c
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <TiltCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
