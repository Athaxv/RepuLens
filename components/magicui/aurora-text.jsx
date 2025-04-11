"use client";
import React, { memo } from "react";

export const AuroraText = memo(({
  children,
  className = "",
  colors = ["#ffaa40", "#ffaa40", "#9c40ff", "#9c40ff"],
  speed = 3,
}) => {
  const duration = 10 / speed;

  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% auto",
    animation: `aurora ${duration}s ease-in-out infinite alternate`,
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="relative text-transparent"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = "AuroraText";
