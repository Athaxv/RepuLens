"use client"

import { ArrowDown, ArrowUp, BarChart3, MessageSquare, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

// interface CompanyMetricsCardsProps {
//   isLoading?: boolean
// }

export function CompanyMetricsCards({ isLoading = false }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {isLoading ? (
        <>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <motion.div key={i} variants={item}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mb-2 h-8 w-36" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </>
      ) : (
        <>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+5.2%</span> from last month
                  </p>
                </div>
                <Progress className="mt-3" value={78} />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mentions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,154</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+12.3%</span> from last quarter
                  </p>
                </div>
                <Progress className="mt-3" value={65} />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Position</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3rd</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+1</span> from last year
                  </p>
                </div>
                <Progress className="mt-3" value={85} />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consumer Trust</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">High</div>
                <div className="flex items-center space-x-2">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 font-medium">-2%</span> from last month
                  </p>
                </div>
                <Progress className="mt-3" value={72} />
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
