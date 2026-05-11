"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../SectionLabel";
import Image from "next/image";
import { useRef, useState } from "react";

const stats = [
  { v: "60+", l: "Projects shipped" },
  { v: "24", l: "Happy clients" },
  { v: "18", l: "Tools mastered" },
  { v: "3y", l: "Building things" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="01"
          label="About"
          title={"A maker who lives\nbetween disciplines."}
          subtitle="I sit comfortably between the engineer who refactors at 2am and the designer who agonizes over kerning. Then I automate the boring parts."
        />

        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 space-y-5 md:col-span-7"
          >
            <p className="text-lg leading-relaxed text-foreground/85">
              I'm <span className="text-primary">Aser</span> — a junior full-stack developer, brand designer, n8n
              automation engineer, and virtual assistant rolled into one focused operator.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I've spent the last three years helping founders move from idea to production — wiring databases,
              redrawing logos, building pipelines that send themselves, and answering inboxes that didn't ask to
              exist. I work in tight loops, ship in public, and keep receipts.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="glass glass-hover rounded-xl p-4">
                  <div className="font-display text-3xl font-bold text-gradient">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

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
            className="col-span-12 md:col-span-4 md:col-start-9 group relative aspect-[4/5] overflow-hidden rounded-2xl glass glass-hover transition-transform duration-200"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src="/aser-profile.jpg" alt="Aser's Photograph" fill className="object-cover" sizes="1080px" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/10 to-transparent" />
              <div className="absolute inset-0 grid-overlay opacity-50" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/80 opacity-80">
                  // currently
                </div>
                <div className="mt-2 font-display text-2xl font-semibold leading-tight text-white/85">
                  Building tiny tools that solve big-team problems.
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-2 py-1 font-mono text-[10px] backdrop-blur text-white/80">
                ◖ aser.jpg
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
