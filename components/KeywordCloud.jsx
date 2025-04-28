"use client"

import { motion } from "framer-motion"

export function KeywordCloud() {
  const keywords = [
    { text: "Innovation", size: "text-xl", weight: "font-bold", color: "text-amber-300" },
    { text: "Quality", size: "text-lg", weight: "font-semibold", color: "text-white" },
    { text: "Technology", size: "text-2xl", weight: "font-bold", color: "text-amber-300" },
    { text: "Service", size: "text-base", weight: "font-medium", color: "text-white/80" },
    { text: "Growth", size: "text-xl", weight: "font-bold", color: "text-white" },
    { text: "Analytics", size: "text-lg", weight: "font-semibold", color: "text-amber-300/90" },
    { text: "Customer", size: "text-xl", weight: "font-bold", color: "text-white/90" },
    { text: "Feedback", size: "text-base", weight: "font-medium", color: "text-white/80" },
    { text: "Sentiment", size: "text-2xl", weight: "font-bold", color: "text-amber-300" },
    { text: "Prediction", size: "text-lg", weight: "font-semibold", color: "text-white" },
    { text: "AI", size: "text-xl", weight: "font-bold", color: "text-amber-300/90" },
    { text: "Data", size: "text-lg", weight: "font-semibold", color: "text-white/90" },
    { text: "Trends", size: "text-base", weight: "font-medium", color: "text-white/80" },
    { text: "Social", size: "text-lg", weight: "font-semibold", color: "text-white" },
    { text: "Media", size: "text-base", weight: "font-medium", color: "text-amber-300/80" },
    { text: "Brand", size: "text-xl", weight: "font-bold", color: "text-white/90" },
    { text: "Reputation", size: "text-lg", weight: "font-semibold", color: "text-white/80" },
    { text: "Monitoring", size: "text-base", weight: "font-medium", color: "text-amber-300/80" },
  ]

  return (
    <div className="flex h-[250px] flex-wrap items-center justify-center gap-4 overflow-hidden">
      {keywords.map((keyword, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.03 }}
          className={`inline-block ${keyword.size} ${keyword.weight} ${keyword.color}`}
          style={{
            transform: `rotate(${Math.random() * 10 - 5}deg)`,
          }}
        >
          {keyword.text}
        </motion.span>
      ))}
    </div>
  )
}
