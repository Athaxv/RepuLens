"use client"

import { useEffect, useState } from "react"
import {
  Building2,
  Download,
  ExternalLink,
  Filter,
  LineChart,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshButton } from "@/components/refresh-button"
import { CompetitorComparisonChart } from "@/components/competitor-comparison-chart"
import { SectorPerformanceChart } from "@/components/sector-performance-chart"
import { CompetitorRadarChart } from "@/components/competitor-radar-chart"
import { CompetitorGrowthChart } from "@/components/competitor-growth-chart"

export default function CompetitorsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState("Technology")
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefreshData = async () => {
    setIsLoading(true)

    // Simulate API call to refresh data
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        resolve()
      }, 1500)
    })
  }

  const handleIndustryChange = (value) => {
    setIsLoading(true)
    setSelectedIndustry(value)

    // Simulate loading when changing industry
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleTimeRangeChange = (value) => {
    setIsLoading(true)
    setTimeRange(value)

    // Simulate loading when changing time range
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

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
    <div className="container py-6 md:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Competitor Analysis</h1>
        <p className="text-muted-foreground">Monitor and compare your company against competitors in your industry</p>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search competitors..." className="w-full pl-8 sm:w-[200px]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Competitor</span>
          </Button>

          <RefreshButton onRefresh={handleRefreshData} />

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Top Competitors
              </CardTitle>
              <CardDescription>Monitor your top competitors in the industry</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1">
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
                      <div key={i} className="rounded-lg border border-border bg-card p-4">
                        <Skeleton className="mb-2 h-5 w-32" />
                        <Skeleton className="mb-4 h-4 w-24" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    ))
                : competitors.map((competitor, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:bg-accent"
                    >
                      <h3 className="font-medium">{competitor.name}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{competitor.industry}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{competitor.sentiment}%</div>
                        <div
                          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            competitor.trend === "up" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="md:col-span-2 lg:col-span-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-primary" />
                        Sentiment Comparison
                      </CardTitle>
                      <CardDescription>Compare sentiment across selected companies</CardDescription>
                    </div>
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">7 days</SelectItem>
                        <SelectItem value="30days">30 days</SelectItem>
                        <SelectItem value="90days">90 days</SelectItem>
                        <SelectItem value="1year">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="px-2">
                  {isLoading ? <Skeleton className="h-[350px] w-full" /> : <CompetitorComparisonChart />}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Performance</CardTitle>
                  <CardDescription>Leaderboard of companies in your sector</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? <Skeleton className="h-[350px] w-full" /> : <SectorPerformanceChart />}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Positioning</CardTitle>
              <CardDescription>Compare your company against competitors across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[400px] w-full" /> : <CompetitorRadarChart />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Comparison</CardTitle>
              <CardDescription>Detailed sentiment analysis comparison with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[500px] w-full" /> : <CompetitorComparisonChart detailed />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Growth Comparison</CardTitle>
              <CardDescription>Compare growth trends between your company and competitors</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[500px] w-full" /> : <CompetitorGrowthChart />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>Compare product features and capabilities with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[500px] w-full" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left font-medium">Feature</th>
                        <th className="py-3 text-center font-medium">Your Company</th>
                        <th className="py-3 text-center font-medium">TechVision Inc.</th>
                        <th className="py-3 text-center font-medium">Nexus Solutions</th>
                        <th className="py-3 text-center font-medium">GlobalTech Partners</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">AI-Powered Analytics</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Real-time Monitoring</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Predictive Analytics</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Multi-platform Support</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Custom Reporting</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">API Access</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Mobile App</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                      </tr>
                      <tr>
                        <td className="py-3">24/7 Support</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                        <td className="py-3 text-center text-green-500">✓</td>
                        <td className="py-3 text-center text-red-500">✗</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
