"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// interface CompanySentimentChartProps {
//   isLoading?: boolean
// }

const timelineData = [
  { date: "Jan", twitter: 65, reddit: 58, news: 80, overall: 68 },
  { date: "Feb", twitter: 68, reddit: 60, news: 82, overall: 70 },
  { date: "Mar", twitter: 70, reddit: 65, news: 81, overall: 72 },
  { date: "Apr", twitter: 72, reddit: 70, news: 80, overall: 74 },
  { date: "May", twitter: 75, reddit: 72, news: 82, overall: 76 },
  { date: "Jun", twitter: 78, reddit: 75, news: 85, overall: 78 },
  { date: "Jul", twitter: 80, reddit: 78, news: 88, overall: 82 },
  { date: "Aug", twitter: 82, reddit: 80, news: 87, overall: 83 },
  { date: "Sep", twitter: 80, reddit: 78, news: 85, overall: 81 },
  { date: "Oct", twitter: 78, reddit: 75, news: 83, overall: 78 },
  { date: "Nov", twitter: 75, reddit: 72, news: 80, overall: 76 },
  { date: "Dec", twitter: 78, reddit: 75, news: 82, overall: 78 },
]

const sentimentData = [
  { category: "Product Quality", positive: 75, neutral: 15, negative: 10 },
  { category: "Customer Service", positive: 60, neutral: 25, negative: 15 },
  { category: "Price", positive: 50, neutral: 30, negative: 20 },
  { category: "User Experience", positive: 80, neutral: 15, negative: 5 },
  { category: "Reliability", positive: 70, neutral: 20, negative: 10 },
]

const keywordData = [
  { keyword: "Quality", sentiment: 85, volume: 320 },
  { keyword: "Service", sentiment: 65, volume: 280 },
  { keyword: "Price", sentiment: 45, volume: 240 },
  { keyword: "Innovation", sentiment: 90, volume: 220 },
  { keyword: "Support", sentiment: 72, volume: 180 },
  { keyword: "Design", sentiment: 80, volume: 160 },
  { keyword: "Features", sentiment: 78, volume: 150 },
  { keyword: "Value", sentiment: 60, volume: 140 },
]

export function CompanySentimentChart({ isLoading = false }) {
  const getBarColor = (sentiment) => {
    if (sentiment >= 70) return "#4ade80"
    if (sentiment >= 50) return "#facc15"
    return "#f87171"
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
          <CardDescription>Detailed sentiment breakdown across different metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Detailed sentiment breakdown across different metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                            <p className="mb-2 font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <div key={`sentiment-${index}`} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                  <span className="text-sm">{entry.name}:</span>
                                </div>
                                <span className="font-medium">{entry.value}%</span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="twitter"
                    name="Twitter"
                    stroke="#1DA1F2"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reddit"
                    name="Reddit"
                    stroke="#FF4500"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="news"
                    name="News"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="overall"
                    name="Overall"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                  <XAxis dataKey="category" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                            <p className="mb-2 font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <div key={`sentiment-${index}`} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                  <span className="text-sm">{entry.name}:</span>
                                </div>
                                <span className="font-medium">{entry.value}%</span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey="positive" name="Positive" stackId="a" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="negative" name="Negative" stackId="a" fill="#f87171" radius={[0, 0, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={keywordData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="keyword" width={90} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: getBarColor(payload[0].payload.sentiment) }}
                              ></div>
                              <span className="font-medium">{label}</span>
                            </div>
                            <div className="mt-1 text-sm">
                              <div className="flex justify-between gap-2">
                                <span>Sentiment:</span>
                                <span className="font-medium">{payload[0].value}%</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span>Mentions:</span>
                                <span className="font-medium">{payload[0].payload.volume}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="sentiment" radius={[0, 4, 4, 0]}>
                    {keywordData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
