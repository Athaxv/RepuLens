"use client"

import { AlertTriangle, ArrowDown, ArrowUp, BarChart3, Download, Loader2, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SentimentChart } from "./sentiment-chart"


import { topInfluencers } from "./topInfluencers"
import { GrowthChart } from "./growthChart"
import { KeywordCloud } from "./KeywordCloud"

// interface CompanyDashboardProps {
//   isLoading: boolean
// }

export function CompanyDashboard({ isLoading }) {
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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <Skeleton className="h-5 w-24 bg-white/10" />
                      <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="mb-2 h-8 w-36 bg-white/10" />
                      <Skeleton className="h-4 w-full bg-white/10" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </>
        ) : (
          <>
            <motion.div variants={item}>
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
                  <BarChart3 className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <p className="text-xs text-white/70">
                      <span className="text-green-400 font-medium">+5.2%</span> from last month
                    </p>
                  </div>
                  <Progress className="mt-3 bg-white/10" value={78} indicatorClassName="bg-amber-300" />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92/100</div>
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <p className="text-xs text-white/70">
                      <span className="text-green-400 font-medium">+12.3%</span> from last quarter
                    </p>
                  </div>
                  <Progress className="mt-3 bg-white/10" value={92} indicatorClassName="bg-amber-300" />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Audience</CardTitle>
                  <Users className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.5K</div>
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <p className="text-xs text-white/70">
                      <span className="text-green-400 font-medium">+2.1K</span> new this month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crisis Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Low</div>
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="h-4 w-4 text-green-400" />
                    <p className="text-xs text-white/70">
                      <span className="text-green-400 font-medium">-12%</span> from last week
                    </p>
                  </div>
                  <Progress className="mt-3 bg-white/10" value={15} indicatorClassName="bg-amber-300" />
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription className="text-white/70">
                  Track your company's sentiment across different platforms
                </CardDescription>
              </div>
              <div>
                <Tabs defaultValue="30days">
                  <TabsList className="grid w-full grid-cols-3 border border-white/10 bg-white/5">
                    <TabsTrigger value="7days" className="data-[state=active]:bg-white data-[state=active]:text-black">
                      7d
                    </TabsTrigger>
                    <TabsTrigger value="30days" className="data-[state=active]:bg-white data-[state=active]:text-black">
                      30d
                    </TabsTrigger>
                    <TabsTrigger
                      value="6months"
                      className="data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                      6m
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              {isLoading ? (
                <div className="flex h-[350px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                </div>
              ) : (
                <SentimentChart />
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
              <CardDescription className="text-white/70">
                Most frequent terms associated with your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-lg bg-white/10" />
                </div>
              ) : (
                <KeywordCloud />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Growth Forecast</CardTitle>
                <CardDescription className="text-white/70">Predicted growth over the next 6 months</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </CardHeader>
            <CardContent className="px-2">
              {isLoading ? (
                <div className="flex h-[350px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                </div>
              ) : (
                <GrowthChart />
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Top Influencers</CardTitle>
              <CardDescription className="text-white/70">People with the most impact on your brand</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32 bg-white/10" />
                          <Skeleton className="h-3 w-24 bg-white/10" />
                        </div>
                        <Skeleton className="ml-auto h-4 w-8 bg-white/10" />
                      </div>
                    ))}
                </div>
              ) : (
                <topInfluencers />
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                View All Influencers
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
