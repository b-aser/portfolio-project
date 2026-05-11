'use client'
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 250, mass: 0.5 });
  const sy = useSpring(y, { damping: 25, stiffness: 250, mass: 0.5 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-magnetic],input,textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.4 : 1 }}
          className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-primary shadow-glow"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          animate={{ scale: hover ? 1.6 : 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-primary/40"
        />
      </motion.div>
    </>
  );
}
