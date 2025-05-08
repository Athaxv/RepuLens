"use client"

import { Building2, ExternalLink, TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// interface TopCompetitorsProps {
//   isLoading: boolean
// }

export function TopCompetitors({ isLoading }) {
  const competitors = [
    {
      name: "TechVision Inc.",
      industry: "Technology",
      sentiment: 72,
      change: 3.2,
      trend: "up",
    },
    {
      name: "Nexus Solutions",
      industry: "Technology",
      sentiment: 68,
      change: -1.5,
      trend: "down",
    },
    {
      name: "GlobalTech Partners",
      industry: "Technology",
      sentiment: 65,
      change: 2.1,
      trend: "up",
    },
    {
      name: "Innovate Systems",
      industry: "Technology",
      sentiment: 62,
      change: -0.8,
      trend: "down",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-amber-300" />
              Top Competitors
            </CardTitle>
            <CardDescription className="text-white/70">Monitor your top competitors in the industry</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            View All
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <Skeleton className="mb-2 h-5 w-32 bg-white/10" />
                      <Skeleton className="mb-4 h-4 w-24 bg-white/10" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-16 bg-white/10" />
                        <Skeleton className="h-6 w-16 bg-white/10" />
                      </div>
                    </div>
                  ))
              : competitors.map((competitor, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <h3 className="font-medium">{competitor.name}</h3>
                    <p className="mb-4 text-sm text-white/70">{competitor.industry}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{competitor.sentiment}%</div>
                      <div
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          competitor.trend === "up" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                        }`}
                      >
                        {competitor.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {competitor.change > 0 ? "+" : ""}
                        {competitor.change}%
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
