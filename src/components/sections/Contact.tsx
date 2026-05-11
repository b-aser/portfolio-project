'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import {  MailIcon, ArrowUpRight } from "lucide-react";
import {  RiGithubFill, RiLinkedinFill,RiMailFill,RiTwitterFill } from "@remixicon/react";
import { MagneticButton } from "../MagneticButton";

function Field({ label, type = "text", textarea }: { label: string; type?: string; textarea?: boolean }) {
  const [v, setV] = useState("");
  const [f, setF] = useState(false);
  const Comp: any = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Comp
        type={type}
        value={v}
        onChange={(e: any) => setV(e.target.value)}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        rows={textarea ? 4 : undefined}
        className="peer w-full resize-none border-0 border-b border-border bg-transparent py-4 text-base text-foreground outline-none transition-colors focus:border-primary"
      />
      <label
        className={`pointer-events-none absolute left-0 transition-all ${
          f || v ? "top-0 text-[11px] uppercase tracking-widest text-primary" : "top-4 text-base text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

const socials = [
  { i: RiGithubFill, l: "GitHub", href: "https://github.com/b-aser" },
  { i: RiLinkedinFill, l: "LinkedIn", href: "https://www.linkedin.com/in/aser-alemu/" },
  { i: RiTwitterFill, l: "Twitter", href: "https://x.com/aser_tesfaye" },
  { i: RiMailFill, l: "Email", href: "mailto:aser.developer@gmail.com" },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-18 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-primary">06</span>
          <span className="h-px w-10 bg-border" />
          <span>Contact</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[12vw] font-bold leading-[0.92] tracking-tighter md:text-[8vw]"
        >
          Let's work
          <br />
          <span className="italic font-light text-muted-foreground">together.</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <Field label="Your name" />
              <Field label="Email" type="email" />
              <Field label="What are you building?" textarea />
              <div className="pt-6">
                <MagneticButton>
                  Send message <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </form>
          </div>

          <div className="col-span-12 space-y-6 md:col-span-4 md:col-start-9">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available now
              </div>
              <div className="mt-3 font-display text-xl font-bold">Addis Ababa · UTC+3</div>
              <div className="mt-1 text-xs text-muted-foreground">Replies within 24 hours</div>
            </div>

            <div className="space-y-2">
              {socials.map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 transition-all hover:border-primary/40 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <s.i className="h-4 w-4 text-primary" /> {s.l}
                  </span>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-muted-foreground transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
          <span>© 2026 Aser. Crafted with intent.</span>
          <span>v2.6.0 · last shipped today</span>
        </div>
      </div>
    </section>
  );
}
