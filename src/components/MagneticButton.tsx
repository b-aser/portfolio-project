import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function MagneticButton({ children, variant, className, onClick, href, type = "button", disabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
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
      className={cn(
        "inline-flex select-none items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
        styles,
        className,
      )}
    >
      {children}
    </motion.div>
  );

  if (href) return <a href={href}>{inner}</a>;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {inner}
    </button>
  );
}
