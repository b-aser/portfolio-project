import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  href?: string;
};

export function MagneticButton({ children, variant = "primary", className, onClick, href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.3 });
  };

  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-glow hover:shadow-[0_0_60px_var(--glow)]"
      : "glass text-foreground glass-hover";

  const inner = (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
      onClick={onClick}
      className={cn(
        "inline-flex select-none items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
        styles,
        className,
      )}
    >
      {children}
    </motion.div>
  );

  return href ? <a href={href}>{inner}</a> : inner;
}
