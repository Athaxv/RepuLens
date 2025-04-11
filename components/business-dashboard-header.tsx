"use client"

import { AlertTriangle, BarChart3, LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BusinessDashboardHeader({ company }: { company: string }) {
  // Sample data for the dashboard header
  const getHeaderData = (company: string) => {
    if (company === "Nike") {
      return {
        sentiment: 72.4,
        sentimentChange: "+2.5%",
        controversies: 3,
        highImpact: 2,
        mediumImpact: 1,
        stockPrice: "$135.42",
        stockChange: "+3.2%",
      }
    } else if (company === "Facebook") {
      return {
        sentiment: 40.2,
        sentimentChange: "-5.3%",
        controversies: 5,
        highImpact: 3,
        mediumImpact: 2,
        stockPrice: "$270.85",
        stockChange: "-1.8%",
      }
    } else {
      return {
        sentiment: 48.5,
        sentimentChange: "-1.2%",
        controversies: 4,
        highImpact: 2,
        mediumImpact: 2,
        stockPrice: "$97.25",
        stockChange: "-0.8%",
      }
    }
  }

  const data = getHeaderData(company)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{company} Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant={data.sentimentChange.startsWith("+") ? "default" : "destructive"}>
            {data.sentimentChange.startsWith("+") ? "Improving" : "Declining"}
          </Badge>
          {data.highImpact > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {data.highImpact} High Impact {data.highImpact === 1 ? "Issue" : "Issues"}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-muted-foreground">
        Monitor and analyze {company}'s reputation across all platforms in real-time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.sentiment}%</div>
            <p className="text-xs text-muted-foreground">{data.sentimentChange} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Controversies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.controversies}</div>
            <p className="text-xs text-muted-foreground">
              {data.highImpact} high impact, {data.mediumImpact} medium impact
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Price</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stockPrice}</div>
            <p className="text-xs text-muted-foreground">{data.stockChange} in the last 24 hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
