"use client"

import { useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// interface CompanyComparisonProps {
//   isLoading?: boolean
// }

const data = [
  {
    subject: "Product Quality",
    "TechVision Inc.": 78,
    DataSphere: 65,
    CloudNexus: 82,
    fullMark: 100,
  },
  {
    subject: "Customer Service",
    "TechVision Inc.": 65,
    DataSphere: 59,
    CloudNexus: 70,
    fullMark: 100,
  },
  {
    subject: "Price",
    "TechVision Inc.": 55,
    DataSphere: 68,
    CloudNexus: 60,
    fullMark: 100,
  },
  {
    subject: "Innovation",
    "TechVision Inc.": 85,
    DataSphere: 70,
    CloudNexus: 80,
    fullMark: 100,
  },
  {
    subject: "Market Share",
    "TechVision Inc.": 72,
    DataSphere: 80,
    CloudNexus: 65,
    fullMark: 100,
  },
  {
    subject: "Growth",
    "TechVision Inc.": 80,
    DataSphere: 75,
    CloudNexus: 85,
    fullMark: 100,
  },
]

export function CompanyComparison({ isLoading = false }) {
  const [competitor1, setCompetitor1] = useState("DataSphere")
  const [competitor2, setCompetitor2] = useState("CloudNexus")

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Competitor Comparison</CardTitle>
          <CardDescription>Compare sentiment metrics with competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 w-full sm:w-[200px]" />
            <Skeleton className="h-10 w-full sm:w-[200px]" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Comparison</CardTitle>
        <CardDescription>Compare sentiment metrics with competitors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <Select value={competitor1} onValueChange={setCompetitor1}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select competitor 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DataSphere">DataSphere</SelectItem>
              <SelectItem value="CloudNexus">CloudNexus</SelectItem>
              <SelectItem value="InnovateCorp">InnovateCorp</SelectItem>
              <SelectItem value="FutureTech">FutureTech</SelectItem>
            </SelectContent>
          </Select>

          <Select value={competitor2} onValueChange={setCompetitor2}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select competitor 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DataSphere">DataSphere</SelectItem>
              <SelectItem value="CloudNexus">CloudNexus</SelectItem>
              <SelectItem value="InnovateCorp">InnovateCorp</SelectItem>
              <SelectItem value="FutureTech">FutureTech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="TechVision Inc."
                dataKey="TechVision Inc."
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
              <Radar name={competitor1} dataKey={competitor1} stroke="#4ade80" fill="#4ade80" fillOpacity={0.2} />
              <Radar name={competitor2} dataKey={competitor2} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
