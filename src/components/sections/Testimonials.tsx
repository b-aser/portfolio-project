"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionLabel } from "../SectionLabel";

const items = [
  {
    q: "Aser rebuilt our internal tooling in three weeks. The team got back ten hours a week — instantly.",
    n: "Maya R.",
    r: "Ops Lead, Northwind",
  },
  {
    q: "Designer's eye, engineer's brain. Rare combo. The brand finally feels like us.",
    n: "Diego S.",
    r: "Founder, Slatehouse",
  },
  {
    q: "The n8n flows just… work. No babysitting. No surprises.",
    n: "Alina K.",
    r: "Growth, Pylon",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" label="Kind words" title={"What clients\nsay after."} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover relative flex flex-col gap-6 rounded-2xl p-7"
            >
              <Quote className="h-7 w-7 text-primary/60" />
              <p className="flex-1 text-base leading-relaxed text-foreground/85">"{t.q}"</p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-[11px] text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
