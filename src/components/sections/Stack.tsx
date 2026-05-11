"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../SectionLabel";

const groups = [
  { label: "Code", items: ["React", "TypeScript", "Next.js", "Node", "Supabase", "Postgres", "Tailwind"] },
  { label: "Design", items: ["Figma", "Illustrator", "Photoshop", "Framer", "Affinity"] },
  { label: "Automation", items: ["n8n", "Zapier", "Make", "OpenAI", "Webhooks", "REST APIs"] },
  { label: "Ops", items: ["Notion", "ClickUp", "Slack", "Linear", "Google Workspace"] },
];

const marquee = [
  "React", "n8n", "TypeScript", "Figma", "Supabase", "OpenAI", "Tailwind", "Notion",
  "Postgres", "Framer", "Node", "Zapier", "Stripe", "Make", "Vite",
];

export function Stack() {
  return (
    <section id="stack" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          index="04"
          label="Toolbox"
          title={"The kit I reach\nfor every day."}
          subtitle="Sharp tools, used often. I learn what a project needs, but these are home."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{g.label}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-12 font-display text-3xl font-bold text-muted-foreground md:text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              {m}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
