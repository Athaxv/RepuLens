"use client"

import { motion } from "framer-motion"

export function CompanyLogos() {
  const companies = [
    "JP Morgan",
    "Goldman Sachs",
    "Unilever",
    "P&G",
    "Meta",
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Tesla",
  ]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        }}
        className="flex w-fit"
      >
        {[...companies, ...companies].map((company, index) => (
          <div
            key={index}
            className="mx-8 flex w-40 items-center justify-center whitespace-nowrap text-lg font-medium text-white/50"
          >
            {company}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
