"use client"
import React from "react"

export const AuroraText = ({ children, className = "", colors = ["#f7dd1c", "#fbd52a", "#fbc335", "#9c40ff"], speed = 3 }) => {
  const duration = 10 / speed

  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% auto",
    animation: `aurora ${duration}s ease-in-out infinite alternate`,
    pointerEvents: "none", // ✅ Crucial line
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span className="relative text-transparent" style={gradientStyle}>
        {children}
      </span>
    </span>
  )
}
