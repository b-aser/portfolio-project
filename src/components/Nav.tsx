'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Moon, Snowflake } from "lucide-react";
import { useTheme } from "next-themes";


const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (

    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500",
        scrolled ? "w-[min(92vw,720px)]" : "w-[min(94vw,820px)]",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-full px-5 transition-all ",
          scrolled ? "py-2 glass shadow-card" : "py-3 glass",
        )}
      >
        <a href="#top" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent shadow-glow" />
          <span className="font-display text-sm font-bold tracking-tight">Aser.dev</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-transparent"
          >
            {/* Light icon Dark icon Vibe
            Zap    ZapOff    Energy on/off
            Contrast  CircleDisplay-likeLightbulbLightbulbOffClassic but modernEyeEyeOffSleek & minimalSparklesCloudyDreamy & softFlameSnowflakeWarm/cool contrast */}
            <Snowflake  className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 " />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <a
            href="#contact"
            className="rounded-full bg-primary/90 px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary"
          >
            Hire me
          </a>
        </div>
      </div>
    </motion.header>
  );
}
