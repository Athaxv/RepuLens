"use client"

import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample trending controversies data
const controversiesData = [
  {
    company: "Nike",
    title: "Labor Practices in Southeast Asia",
    date: "2 days ago",
    source: "Reuters",
    sourceUrl: "#",
    description:
      "Reports have emerged about poor working conditions in Nike's manufacturing facilities in Vietnam, with allegations of excessive overtime and inadequate compensation.",
    impact: "high",
    sentiment: {
      positive: 15,
      neutral: 25,
      negative: 60,
    },
    mentions: 12500,
    category: "Labor",
  },
  {
    company: "Facebook",
    title: "Data Privacy Breach Affecting Millions",
    date: "1 week ago",
    source: "The New York Times",
    sourceUrl: "#",
    description:
      "A major data breach at Facebook has exposed personal information of millions of users, raising concerns about the company's data security practices and potential regulatory consequences.",
    impact: "high",
    sentiment: {
      positive: 5,
      neutral: 15,
      negative: 80,
    },
    mentions: 45000,
    category: "Privacy",
  },
  {
    company: "Nestle",
    title: "Water Extraction in Drought-Prone Regions",
    date: "3 days ago",
    source: "The Guardian",
    sourceUrl: "#",
    description:
      "Nestle faces criticism for continuing to extract millions of gallons of water in regions experiencing severe drought conditions, despite community opposition and environmental concerns.",
    impact: "medium",
    sentiment: {
      positive: 10,
      neutral: 30,
      negative: 60,
    },
    mentions: 8700,
    category: "Environment",
  },
  {
    company: "Amazon",
    title: "Warehouse Working Conditions Investigation",
    date: "5 days ago",
    source: "Washington Post",
    sourceUrl: "#",
    description:
      "An investigation into Amazon's warehouse working conditions has revealed concerns about worker safety, productivity quotas, and union-busting tactics at multiple facilities.",
    impact: "medium",
    sentiment: {
      positive: 12,
      neutral: 28,
      negative: 60,
    },
    mentions: 9800,
    category: "Labor",
  },
  {
    company: "Tesla",
    title: "Autopilot Safety Concerns After Accidents",
    date: "1 day ago",
    source: "Bloomberg",
    sourceUrl: "#",
    description:
      "Following several accidents involving Tesla vehicles with Autopilot engaged, regulators are investigating the safety of the driver assistance system and the company's marketing claims.",
    impact: "high",
    sentiment: {
      positive: 20,
      neutral: 25,
      negative: 55,
    },
    mentions: 15600,
    category: "Product Safety",
  },
]

export function TrendingControversies() {
  return (
    <Tabs defaultValue="all">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          Last updated: 15 minutes ago
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <TabsContent value="all" className="mt-0 space-y-4">
          {controversiesData.map((controversy, index) => (
            <ControversyCard key={index} controversy={controversy} />
          ))}
        </TabsContent>

        <TabsContent value="labor" className="mt-0 space-y-4">
          {controversiesData
            .filter((c) => c.category === "Labor")
            .map((controversy, index) => (
              <ControversyCard key={index} controversy={controversy} />
            ))}
        </TabsContent>

        <TabsContent value="environment" className="mt-0 space-y-4">
          {controversiesData
            .filter((c) => c.category === "Environment")
            .map((controversy, index) => (
              <ControversyCard key={index} controversy={controversy} />
            ))}
        </TabsContent>

        <TabsContent value="privacy" className="mt-0 space-y-4">
          {controversiesData
            .filter((c) => c.category === "Privacy")
            .map((controversy, index) => (
              <ControversyCard key={index} controversy={controversy} />
            ))}
        </TabsContent>

        <TabsContent value="product" className="mt-0 space-y-4">
          {controversiesData
            .filter((c) => c.category === "Product Safety")
            .map((controversy, index) => (
              <ControversyCard key={index} controversy={controversy} />
            ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}

function ControversyCard({ controversy }: { controversy: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{controversy.company}</Badge>
              <CardDescription className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {controversy.date}
              </CardDescription>
            </div>
            <CardTitle className="text-base mt-1">{controversy.title}</CardTitle>
          </div>
          <Badge
            variant={
              controversy.impact === "high" ? "destructive" : controversy.impact === "medium" ? "warning" : "default"
            }
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {controversy.impact.charAt(0).toUpperCase() + controversy.impact.slice(1)} Impact
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{controversy.description}</p>
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <span>Source: {controversy.source}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <span className="text-xs">{controversy.sentiment.positive}%</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <span className="text-xs">{controversy.sentiment.negative}%</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">{controversy.mentions.toLocaleString()} mentions</span>
          </div>
        </div>
        <div>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
