export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-mesh opacity-80" />
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] animate-float-slow" />
      <div
        className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px] animate-float-slow"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full blur-[140px] animate-float-slow"
        style={{ background: "oklch(0.6 0.22 200 / 0.18)", animationDelay: "-9s" }}
      />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
