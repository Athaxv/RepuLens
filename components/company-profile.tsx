"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Calendar,
  Clock,
  ExternalLink,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompanySelector } from "@/components/company-selector"

// Sample company data
const getCompanyData = (company: string) => {
  if (company === "Nike") {
    return {
      name: "Nike, Inc.",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Apparel & Footwear",
      founded: "1964",
      headquarters: "Beaverton, Oregon, USA",
      ceo: "John Donahoe",
      employees: "79,100+",
      revenue: "$44.5 billion (2022)",
      stockSymbol: "NKE",
      currentStock: "$135.42",
      stockChange: "+3.2%",
      sentiment: 72,
      sentimentChange: "+2.5%",
      controversies: [
        {
          title: "Labor Practices in Southeast Asia",
          date: "March 2025",
          impact: "high",
          description: "Reports of poor working conditions in manufacturing facilities in Vietnam",
          resolution: "Ongoing - Nike announced third-party audit and remediation plan",
        },
        {
          title: "Environmental Impact of Manufacturing",
          date: "January 2025",
          impact: "medium",
          description: "Criticism of carbon footprint and waste from production processes",
          resolution: "Addressed - Announced new sustainability initiative with specific targets",
        },
        {
          title: "Product Quality Issues",
          date: "November 2024",
          impact: "medium",
          description: "Reports of quality issues with premium basketball shoe line",
          resolution: "Resolved - Product recall and redesign implemented",
        },
      ],
      timeline: [
        { date: "April 2025", event: "Launched new sustainability initiative", sentiment: "positive" },
        { date: "March 2025", event: "Labor practices controversy in Vietnam", sentiment: "negative" },
        { date: "February 2025", event: "Quarterly earnings exceeded expectations", sentiment: "positive" },
        { date: "January 2025", event: "Environmental impact criticism", sentiment: "negative" },
        { date: "December 2024", event: "Holiday sales campaign success", sentiment: "positive" },
        { date: "November 2024", event: "Product quality issues reported", sentiment: "negative" },
        { date: "October 2024", event: "New celebrity endorsement deal", sentiment: "positive" },
      ],
    }
  } else if (company === "Facebook") {
    return {
      name: "Meta Platforms, Inc. (Facebook)",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Technology - Social Media",
      founded: "2004",
      headquarters: "Menlo Park, California, USA",
      ceo: "Mark Zuckerberg",
      employees: "77,800+",
      revenue: "$116.6 billion (2022)",
      stockSymbol: "META",
      currentStock: "$270.85",
      stockChange: "-1.8%",
      sentiment: 40,
      sentimentChange: "-5.2%",
      controversies: [
        {
          title: "Data Privacy Scandal",
          date: "February 2025",
          impact: "high",
          description: "Major data breach affecting millions of users' personal information",
          resolution: "Ongoing - Under investigation by multiple regulatory bodies",
        },
        {
          title: "Content Moderation Failures",
          date: "December 2024",
          impact: "high",
          description: "Platform used to spread harmful misinformation during election period",
          resolution: "Partially addressed - New content policies implemented but criticism continues",
        },
        {
          title: "Antitrust Investigation",
          date: "October 2024",
          impact: "high",
          description: "Government investigation into anti-competitive business practices",
          resolution: "Ongoing - Legal proceedings in progress",
        },
      ],
      timeline: [
        { date: "March 2025", event: "Announced new privacy features", sentiment: "positive" },
        { date: "February 2025", event: "Major data privacy scandal revealed", sentiment: "negative" },
        { date: "January 2025", event: "Quarterly earnings below expectations", sentiment: "negative" },
        { date: "December 2024", event: "Content moderation controversy during elections", sentiment: "negative" },
        { date: "November 2024", event: "Launch of new VR product line", sentiment: "positive" },
        { date: "October 2024", event: "Antitrust investigation announced", sentiment: "negative" },
        { date: "September 2024", event: "New advertising platform launched", sentiment: "positive" },
      ],
    }
  } else {
    return {
      name: "Nestlé S.A.",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Food & Beverage",
      founded: "1866",
      headquarters: "Vevey, Switzerland",
      ceo: "Mark Schneider",
      employees: "273,000+",
      revenue: "$94.4 billion (2022)",
      stockSymbol: "NSRGY",
      currentStock: "$97.25",
      stockChange: "-0.8%",
      sentiment: 48,
      sentimentChange: "-1.5%",
      controversies: [
        {
          title: "Water Extraction Practices",
          date: "March 2025",
          impact: "high",
          description: "Criticism of water extraction in drought-prone regions",
          resolution: "Ongoing - Company announced review of practices but continues operations",
        },
        {
          title: "Palm Oil Sourcing",
          date: "January 2025",
          impact: "medium",
          description: "Reports of deforestation linked to palm oil suppliers",
          resolution: "Partially addressed - New supplier guidelines implemented",
        },
        {
          title: "Product Safety Concerns",
          date: "November 2024",
          impact: "high",
          description: "Health concerns related to chemicals in packaging materials",
          resolution: "Addressed - Product packaging redesigned and materials changed",
        },
      ],
      timeline: [
        { date: "April 2025", event: "Launched new organic product line", sentiment: "positive" },
        { date: "March 2025", event: "Water extraction controversy intensified", sentiment: "negative" },
        { date: "February 2025", event: "Quarterly earnings met expectations", sentiment: "neutral" },
        { date: "January 2025", event: "Palm oil sourcing criticism", sentiment: "negative" },
        { date: "December 2024", event: "Holiday marketing campaign success", sentiment: "positive" },
        { date: "November 2024", event: "Product safety concerns emerged", sentiment: "negative" },
        { date: "October 2024", event: "Sustainability initiative announced", sentiment: "positive" },
      ],
    }
  }
}

export function CompanyProfile({ company: initialCompany }: { company: string }) {
  const [selectedCompany, setSelectedCompany] = useState(initialCompany)
  const companyData = getCompanyData(selectedCompany)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{companyData.name}</h2>
        <CompanySelector
          value={selectedCompany}
          onValueChange={setSelectedCompany}
          companies={["Nike", "Facebook", "Nestle"]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Company Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                <img src={companyData.logo || "/placeholder.svg"} alt={companyData.name} className="w-16 h-16" />
              </div>
              <div>
                <div className="font-medium">{companyData.name}</div>
                <div className="text-sm text-muted-foreground">{companyData.industry}</div>
                <div className="mt-2 flex items-center gap-1">
                  <Badge
                    variant={companyData.stockChange.startsWith("+") ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {companyData.stockChange.startsWith("+") ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {companyData.stockChange}
                  </Badge>
                  <span className="text-sm">
                    {companyData.stockSymbol}: {companyData.currentStock}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Founded</span>
                <span>{companyData.founded}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Headquarters</span>
                <span>{companyData.headquarters}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CEO</span>
                <span>{companyData.ceo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employees</span>
                <span>{companyData.employees}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Annual Revenue</span>
                <span>{companyData.revenue}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Reputation Score</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  {companyData.sentiment}%
                  <Badge
                    variant={companyData.sentimentChange.startsWith("+") ? "default" : "destructive"}
                    className="text-xs ml-1"
                  >
                    {companyData.sentimentChange}
                  </Badge>
                </span>
              </div>
              <Progress
                value={companyData.sentiment}
                className="h-2"
                indicatorClassName={
                  companyData.sentiment > 70
                    ? "bg-green-500"
                    : companyData.sentiment > 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                }
              />
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Official Website
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <Tabs defaultValue="controversies">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Company Analysis</CardTitle>
                <TabsList>
                  <TabsTrigger value="controversies">Controversies</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="controversies" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {companyData.controversies.map((controversy, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{controversy.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {controversy.date}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={
                                controversy.impact === "high"
                                  ? "destructive"
                                  : controversy.impact === "medium"
                                    ? "warning"
                                    : "default"
                              }
                            >
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {controversy.impact.charAt(0).toUpperCase() + controversy.impact.slice(1)} Impact
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 space-y-2">
                          <p className="text-sm">{controversy.description}</p>
                          <div className="text-sm">
                            <span className="font-medium">Resolution Status: </span>
                            {controversy.resolution}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="timeline" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="relative pl-6 border-l border-muted">
                    {companyData.timeline.map((item, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className="absolute -left-[25px] p-1 rounded-full bg-background border border-muted">
                          {item.sentiment === "positive" ? (
                            <ThumbsUp className="h-4 w-4 text-green-500" />
                          ) : item.sentiment === "negative" ? (
                            <ThumbsDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                        <div className="font-medium">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
