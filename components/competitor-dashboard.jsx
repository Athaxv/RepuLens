"use client"

import { useState } from "react"
import { ChevronDown, Loader2, Plus, Search, Star, TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompetitorComparisonChart } from "./competitor-comparison-chart"
import { SectorPerformanceChart } from "./Sector-performance-chart"


// interface CompetitorDashboardProps {
//   isLoading: boolean
// }

export function CompetitorDashboard({ isLoading }) {
  const [selectedCompanies, setSelectedCompanies] = useState(["Apple", "Microsoft", "Google"])

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
      <motion.div variants={item}>
        <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle>Competitor Tracking</CardTitle>
                <CardDescription className="text-white/70">Monitor and compare multiple companies</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    type="search"
                    placeholder="Search companies..."
                    className="w-full border-white/10 bg-white/5 pl-8 text-white placeholder:text-white/50 focus:border-amber-300/50 focus:ring-amber-300/50 sm:w-[200px]"
                  />
                </div>
                <Button size="sm" className="gap-1 bg-white text-black hover:bg-white/90">
                  <Plus className="h-4 w-4" />
                  Add Company
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              {isLoading ? (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-8 w-24 rounded-full bg-white/10" />
                    ))}
                </>
              ) : (
                <>
                  {selectedCompanies.map((company) => (
                    <div
                      key={company}
                      className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-medium"
                    >
                      {company}
                      <button className="ml-1 rounded-full p-1 hover:bg-white/20">
                        <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                      </button>
                    </div>
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      >
                        More
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-white/10 bg-black/95 text-white backdrop-blur-md"
                    >
                      <DropdownMenuItem className="focus:bg-white/10 focus:text-white">Amazon</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/10 focus:text-white">Facebook</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/10 focus:text-white">Tesla</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>

            <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {isLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div key={i} variants={item}>
                        <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-24 bg-white/10" />
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
                        <CardTitle className="text-sm font-medium">Apple</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-white/70">Sentiment Score</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={item}>
                    <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Microsoft</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">82%</div>
                        <p className="text-xs text-white/70">Sentiment Score</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={item}>
                    <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Google</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">79%</div>
                        <p className="text-xs text-white/70">Sentiment Score</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={item}>
                    <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Amazon</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68%</div>
                        <p className="text-xs text-white/70">Sentiment Score</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Sentiment Comparison</CardTitle>
                <CardDescription className="text-white/70">Compare sentiment across selected companies</CardDescription>
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
                <CompetitorComparisonChart />
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription className="text-white/70">Leaderboard of companies in your sector</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-lg bg-white/10" />
                </div>
              ) : (
                <SectorPerformanceChart />
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Crisis Alerts</CardTitle>
              <CardDescription className="text-white/70">
                Potential issues detected for tracked companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32 bg-white/10" />
                          <Skeleton className="h-3 w-full bg-white/10" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-400/20 text-red-400">
                      <AlertIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Amazon - Supply Chain Issues</h4>
                      <p className="text-sm text-white/70">
                        Reports of supply chain disruptions affecting delivery times. Sentiment dropping by 12% in the
                        last 24 hours.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                      <AlertIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Google - Privacy Concerns</h4>
                      <p className="text-sm text-white/70">
                        Emerging discussion about data privacy practices. Moderate increase in negative sentiment on
                        social media.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Opportunity Detection</CardTitle>
              <CardDescription className="text-white/70">
                Potential opportunities based on competitor analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32 bg-white/10" />
                          <Skeleton className="h-3 w-full bg-white/10" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20 text-green-400">
                      <OpportunityIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Market Gap - Customer Service</h4>
                      <p className="text-sm text-white/70">
                        Amazon's customer service sentiment has dropped 15%. Opportunity to highlight your superior
                        support.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          Explore Strategy
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20 text-green-400">
                      <OpportunityIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Product Feature Gap</h4>
                      <p className="text-sm text-white/70">
                        Microsoft users frequently requesting features your product already offers. Potential for
                        targeted marketing.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          Explore Strategy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function AlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function OpportunityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="16" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  )
}
