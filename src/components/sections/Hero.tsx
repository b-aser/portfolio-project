"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { MagneticButton } from "../MagneticButton";

const roles = ["Developer.", "Designer.", "Automator.", "Assistant."];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen px-6 pt-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="col-span-12 flex items-center gap-3 md:col-span-7"
        >
          <span className="pill-glow flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to work
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            AA · UTC+3
          </span>
        </motion.div>

        <div className="col-span-12 mt-10 md:col-span-9">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="font-display text-[14vw] font-bold leading-[0.92] tracking-tighter md:text-[8.5vw] lg:text-[7.2vw]"
          >
            I build,{" "}
            <span className="italic font-light text-muted-foreground">
              design
            </span>
            <br />
            and automate
            <br />
            <span className="inline-flex items-baseline gap-4">
              <span className="text-gradient pb-4 pr-4">things</span>
              <span className="relative inline-block h-[1.2em] overflow-hidden align-baseline pb-4 pr-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[i]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-display text-primary"
                  >
                    {roles[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="col-span-12 mt-2 grid grid-cols-12 gap-12 md:gap-6 md:mt-12"
        >
          <div className="col-span-12 md:col-span-5 md:col-start-1">
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              Junior full-stack dev, graphic designer, n8n automation engineer &
              VA. I help small teams ship fast — code, pixels, and pipelines
              included.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="#work">
                See selected work <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="ghost" href="#contact">
                <Sparkles className="h-4 w-4" /> Let's talk
              </MagneticButton>
            </div>
          </div>

          <div className="col-span-10  md:col-span-4 md:col-start-8 md:block">
            <div className="glass relative aspect-[4/3] overflow-hidden rounded-2xl p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/20" />
              <div className="relative flex h-full flex-col justify-between font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 text-[10px]">~/portfolio · main</span>
                </div>
                <div className="space-y-1.5 leading-relaxed">
                  <div>
                    <span className="text-primary">$</span> whoami
                  </div>
                  <div className="text-foreground">
                    → Aser · multi-disciplinary maker
                  </div>
                  <div>
                    <span className="text-primary">$</span> ls ./skills
                  </div>
                  <div className="text-foreground/80">
                    react · ts · n8n · figma · supabase · node · tailwind
                  </div>
                  <div>
                    <span className="text-primary">$</span> status
                  </div>
                  <div className="text-emerald-400">
                    ▸ accepting projects · responds in 24h
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px]">
                  <span>v2.6.0</span>
                  <span>built with ☕ + ⚡</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="ease-in delay-300 absolute bottom-16 left-1/2 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground -translate-x-1/2 md:flex"
      >
        <span>scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
