'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { RiGithubFill, RiLinkedinFill, RiMailFill, RiTwitterFill } from "@remixicon/react";
import { MagneticButton } from "../MagneticButton";

function Field({
  label, type = "text", textarea, value, onChange, disabled,
}: {
  label: string; type?: string; textarea?: boolean;
  value: string; onChange: (v: string) => void; disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Comp: any = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Comp
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 4 : undefined}
        disabled={disabled}
        className="peer w-full resize-none border-0 border-b border-border bg-transparent py-4 text-base text-foreground outline-none transition-colors focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <label
        className={`pointer-events-none absolute left-0 transition-all ${
          focused || value
            ? "top-0 text-[11px] uppercase tracking-widest text-primary"
            : "top-4 text-base text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

const socials = [
  { i: RiGithubFill,   l: "GitHub",   href: "https://github.com/b-aser" },
  { i: RiLinkedinFill, l: "LinkedIn", href: "https://www.linkedin.com/in/aser-alemu/" },
  { i: RiTwitterFill,  l: "Twitter",  href: "https://x.com/aser_tesfaye" },
  { i: RiMailFill,     l: "Email",    href: "mailto:aser.developer@gmail.com" },
];

type Status = "idle" | "loading" | "success" | "error";

function StatusBanner({ status, message }: { status: Status; message: string }) {
  if (status === "idle") return null;
  const config = {
    loading: { icon: <Loader2 className="h-4 w-4 animate-spin" />, color: "text-muted-foreground border-border" },
    success: { icon: <CheckCircle2 className="h-4 w-4" />,         color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" },
    error:   { icon: <XCircle className="h-4 w-4" />,              color: "text-red-400 border-red-400/30 bg-red-400/5" },
  }[status];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${config.color}`}
      >
        {config.icon}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export function Contact() {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [message,   setMessage]   = useState("");
  const [status,    setStatus]    = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setStatusMsg("Please fill in all fields before sending.");
      return;
    }

    setStatus("loading");
    setStatusMsg("Sending your message…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Server error");
      }

      setStatus("success");
      setStatusMsg("Message sent! I'll get back to you within 24 hours.");
      setName(""); setEmail(""); setMessage("");
    } catch (err: any) {
      setStatus("error");
      setStatusMsg(err.message ?? "Something went wrong. Please try again.");
    }
  };

  const busy = status === "loading";

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
            <form onSubmit={handleSubmit} className="space-y-2">
              <Field label="Your name"              value={name}    onChange={setName}    disabled={busy} />
              <Field label="Email" type="email"     value={email}   onChange={setEmail}   disabled={busy} />
              <Field label="What are you building?" value={message} onChange={setMessage} disabled={busy} textarea />

              <div className="space-y-4 pt-6">
                <StatusBanner status={status} message={statusMsg} />
                <MagneticButton type="submit" disabled={busy}>
                  {busy ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    <>Send message <ArrowUpRight className="h-4 w-4" /></>
                  )}
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
