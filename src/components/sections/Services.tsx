"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Workflow, HeadphonesIcon } from "lucide-react";
import { SectionLabel } from "../SectionLabel";

const services = [
  {
    icon: Code2,
    title: "Full-stack Dev",
    desc: "React, TypeScript, Node, Supabase. Production-grade web apps from schema to deploy.",
    tags: ["React", "TS", "Postgres", "Edge"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Brand systems, logos, social kits, and editorial layouts that don't look like everyone else's.",
    tags: ["Figma", "Brand", "Print", "Social"],
  },
  {
    icon: Workflow,
    title: "n8n Automation",
    desc: "Custom workflows that connect your tools and remove 10+ hours of busywork per week.",
    tags: ["n8n", "APIs", "Webhooks", "AI"],
  },
  {
    icon: HeadphonesIcon,
    title: "Virtual Assistance",
    desc: "Inbox triage, research, ops support, and CRM hygiene — all logged, all on time.",
    tags: ["Notion", "CRM", "Ops", "Email"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative px-6 py-18 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="02"
          label="Services"
          title={"Four crafts.\nOne operator."}
          subtitle="Pick one or stack them. Most projects use two — design + dev, or dev + automation."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="group glass glass-hover relative overflow-hidden rounded-2xl p-7"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/25" />
              <div className="relative">
                <div className="mb-6 flex items-start justify-between">
                  <div className="glass flex h-12 w-12 items-center justify-center rounded-xl">
                    <s.icon className="h-5 w-5 text-foreground/80" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="pill-glow rounded-full px-2.5 py-1 font-mono text-[10px] text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
