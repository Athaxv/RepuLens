"use client"

import { useEffect, useState } from "react"
import { BarChart3, Calendar, Download, Filter, LineChart, PieChart, Search, Share2, Sliders } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshButton } from "@/components/refresh-button"
import { SentimentOverTimeChart } from "@/components/sentiment-over-time-chart"
import { SentimentSourcesChart } from "@/components/sentiment-sources-chart"
import { SentimentBreakdownChart } from "@/components/sentiment-breakdown-chart"
import { KeywordSentimentChart } from "@/components/keyword-sentiment-chart"
import { SentimentHeatmap } from "@/components/sentiment-heatmap"

export default function SentimentAnalysisPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState("TechVision Inc.")
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

  const handleCompanyChange = (value) => {
    setIsLoading(true)
    setSelectedCompany(value)

    // Simulate loading when changing company
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

  return (
    <div className="container py-6 md:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
        <p className="text-muted-foreground">
          In-depth sentiment analysis for your company across different platforms and time periods
        </p>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={selectedCompany} onValueChange={handleCompanyChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TechVision Inc.">TechVision Inc.</SelectItem>
              <SelectItem value="DataSphere">DataSphere</SelectItem>
              <SelectItem value="CloudNexus">CloudNexus</SelectItem>
              <SelectItem value="InnovateCorp">InnovateCorp</SelectItem>
              <SelectItem value="FutureTech">FutureTech</SelectItem>
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
            <Input type="search" placeholder="Search keywords..." className="w-full pl-8 sm:w-[200px]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={handleRefreshData} />

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share report</span>
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">78%</div>
                <div className="flex items-center text-sm text-green-500">
                  <span>+5.2%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">1,248</div>
                <div className="flex items-center text-sm text-green-500">
                  <span>+12.3%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Negative Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">342</div>
                <div className="flex items-center text-sm text-red-500">
                  <span>+2.1%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">2,154</div>
                <div className="flex items-center text-sm text-green-500">
                  <span>+8.7%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-primary" />
                      Sentiment Over Time
                    </CardTitle>
                    <CardDescription>Tracking sentiment trends over the selected time period</CardDescription>
                  </div>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <SentimentOverTimeChart />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Sentiment Breakdown
                    </CardTitle>
                    <CardDescription>Distribution of positive, neutral, and negative sentiment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <SentimentBreakdownChart />}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Sentiment by Source
                  </CardTitle>
                  <CardDescription>Comparison of sentiment across different platforms and sources</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Sliders className="mr-2 h-4 w-4" />
                  Configure Sources
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[400px] w-full" /> : <SentimentSourcesChart />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment by Source</CardTitle>
              <CardDescription>Detailed breakdown of sentiment across different platforms and sources</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[500px] w-full" /> : <SentimentSourcesChart detailed />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Sentiment Analysis</CardTitle>
              <CardDescription>
                Sentiment analysis for key terms and phrases associated with your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[500px] w-full" /> : <KeywordSentimentChart />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sentiment Heatmap</CardTitle>
                  <CardDescription>
                    Visualize sentiment patterns over time and across different categories
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Select Date Range
                </Button>
              </div>
            </CardHeader>
            <CardContent>{isLoading ? <Skeleton className="h-[500px] w-full" /> : <SentimentHeatmap />}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
