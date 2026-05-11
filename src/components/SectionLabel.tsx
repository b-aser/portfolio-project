import { motion } from "framer-motion";

export function SectionLabel({ index, label, title, subtitle }: { index: string; label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-14 grid grid-cols-12 items-end gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="col-span-12 md:col-span-5"
      >
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-primary">{index}</span>
          <span className="h-px w-10 bg-border" />
          <span>{label}</span>
        </div>
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-12 max-w-md text-base text-muted-foreground md:col-span-5 md:col-start-8"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
