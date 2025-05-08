"use client"

import { useEffect, useState } from "react"
import { Search, Filter, TrendingUp, BarChart3, MessageSquare, Star, ChevronDown, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CompanySentimentChart } from "@/components/company-sentiment-chart"
import { CompanyTopComments } from "@/components/company-top-comments"
import { CompanyMetricsCards } from "@/components/company-metrics-cards"
import { CompanyComparison } from "@/components/company-comparison"

export default function ConsumerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [timeRange, setTimeRange] = useState("30d")

  // Mock companies data
  const companies = [
    { id: "1", name: "TechVision Inc.", industry: "Technology", sentiment: 78 },
    { id: "2", name: "DataSphere", industry: "Technology", sentiment: 65 },
    { id: "3", name: "CloudNexus", industry: "Cloud Services", sentiment: 82 },
    { id: "4", name: "InnovateCorp", industry: "Software", sentiment: 71 },
    { id: "5", name: "FutureTech", industry: "Technology", sentiment: 76 },
    { id: "6", name: "QuantumSoft", industry: "Software", sentiment: 68 },
    { id: "7", name: "GlobalFinance", industry: "Finance", sentiment: 72 },
    { id: "8", name: "EcoSolutions", industry: "Green Energy", sentiment: 85 },
    { id: "9", name: "HealthPlus", industry: "Healthcare", sentiment: 79 },
    { id: "10", name: "RetailGiant", industry: "Retail", sentiment: 63 },
  ]

  // Filter companies based on search query
  const filteredCompanies = companies.filter(
    (company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "",
  )

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleCompanySelect = (companyId) => {
    setIsLoading(true)
    setSelectedCompany(companyId)

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

  const selectedCompanyData = selectedCompany ? companies.find((company) => company.id === selectedCompany) : null

  return (
    <div className="container py-6 md:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Company Sentiment Explorer</h1>
        <p className="text-muted-foreground">
          Search for companies and explore their sentiment analysis and public perception
        </p>
      </motion.div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for a company..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        {searchQuery && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-[100px] w-full" />)
              : filteredCompanies.map((company) => (
                  <Card
                    key={company.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
                      selectedCompany === company.id ? "border-primary" : ""
                    }`}
                    onClick={() => handleCompanySelect(company.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <Badge
                          variant={
                            company.sentiment >= 75 ? "success" : company.sentiment >= 60 ? "warning" : "destructive"
                          }
                        >
                          {company.sentiment}%
                        </Badge>
                      </div>
                      <CardDescription>{company.industry}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={company.sentiment}
                        className="h-2"
                        indicatorClassName={
                          company.sentiment >= 75
                            ? "bg-green-500"
                            : company.sentiment >= 60
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
          </div>
        )}
      </div>

      {selectedCompanyData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">{selectedCompanyData.name}</h2>
              <p className="text-muted-foreground">{selectedCompanyData.industry}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Star className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowUpDown className="h-4 w-4" />
                <span>Compare</span>
              </Button>
            </div>
          </div>

          <CompanyMetricsCards isLoading={isLoading} />

          <Tabs defaultValue="sentiment" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sentiment">
                <BarChart3 className="mr-2 h-4 w-4" />
                Sentiment Analysis
              </TabsTrigger>
              <TabsTrigger value="comments">
                <MessageSquare className="mr-2 h-4 w-4" />
                Top Comments
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sentiment" className="space-y-6">
              <CompanySentimentChart isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="comments" className="space-y-6">
              <CompanyTopComments isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <CompanyComparison isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </motion.div>
      )}

      {!selectedCompany && !searchQuery && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Companies</CardTitle>
              <CardDescription>Trending companies with recent sentiment changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading
                  ? Array(4)
                      .fill(0)
                      .map((_, i) => <Skeleton key={i} className="h-[100px] w-full" />)
                  : companies.slice(0, 4).map((company) => (
                      <Card
                        key={company.id}
                        className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
                        onClick={() => handleCompanySelect(company.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{company.name}</CardTitle>
                            <Badge
                              variant={
                                company.sentiment >= 75
                                  ? "success"
                                  : company.sentiment >= 60
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {company.sentiment}%
                            </Badge>
                          </div>
                          <CardDescription>{company.industry}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Progress
                            value={company.sentiment}
                            className="h-2"
                            indicatorClassName={
                              company.sentiment >= 75
                                ? "bg-green-500"
                                : company.sentiment >= 60
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-1">
                <ChevronDown className="h-4 w-4" />
                <span>View More Companies</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry Insights</CardTitle>
              <CardDescription>Average sentiment scores by industry</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Technology</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Finance</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Healthcare</span>
                      <span className="font-medium">79%</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Retail</span>
                      <span className="font-medium">63%</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Green Energy</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
