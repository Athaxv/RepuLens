import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
  speed = 4,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) {
  return (
    <span
      style={{
        "--bg-size": "300%",
        "--color-from": colorFrom,
        "--color-to": colorTo,
        animation: `gradient ${speed}s linear infinite`,
      }}
      className={cn(
        "inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
