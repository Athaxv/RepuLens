"use client"

import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Sample data for the sentiment trend
const getTrendData = (company: string) => {
  if (company === "Nike") {
    return [
      { date: "Apr 1", twitter: 65, facebook: 68, reddit: 55, news: 72 },
      { date: "Apr 5", twitter: 68, facebook: 70, reddit: 58, news: 75 },
      { date: "Apr 10", twitter: 75, facebook: 72, reddit: 60, news: 78 },
      { date: "Apr 15", twitter: 72, facebook: 75, reddit: 62, news: 80 },
      { date: "Apr 20", twitter: 70, facebook: 74, reddit: 58, news: 76 },
      { date: "Apr 25", twitter: 75, facebook: 76, reddit: 60, news: 78 },
      { date: "Apr 30", twitter: 78, facebook: 80, reddit: 65, news: 82 },
    ]
  } else if (company === "Facebook") {
    return [
      { date: "Apr 1", twitter: 40, facebook: 60, reddit: 35, news: 45 },
      { date: "Apr 5", twitter: 38, facebook: 58, reddit: 32, news: 42 },
      { date: "Apr 10", twitter: 35, facebook: 55, reddit: 30, news: 38 },
      { date: "Apr 15", twitter: 32, facebook: 52, reddit: 28, news: 35 },
      { date: "Apr 20", twitter: 30, facebook: 50, reddit: 25, news: 32 },
      { date: "Apr 25", twitter: 35, facebook: 52, reddit: 30, news: 38 },
      { date: "Apr 30", twitter: 40, facebook: 55, reddit: 35, news: 42 },
    ]
  } else {
    return [
      { date: "Apr 1", twitter: 45, facebook: 50, reddit: 40, news: 48 },
      { date: "Apr 5", twitter: 42, facebook: 48, reddit: 38, news: 45 },
      { date: "Apr 10", twitter: 40, facebook: 45, reddit: 35, news: 42 },
      { date: "Apr 15", twitter: 38, facebook: 42, reddit: 32, news: 40 },
      { date: "Apr 20", twitter: 42, facebook: 45, reddit: 35, news: 42 },
      { date: "Apr 25", twitter: 45, facebook: 48, reddit: 38, news: 45 },
      { date: "Apr 30", twitter: 48, facebook: 52, reddit: 42, news: 50 },
    ]
  }
}

export function SentimentTrend({ company }: { company: string }) {
  const data = getTrendData(company)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Line
            type="monotone"
            dataKey="twitter"
            name="Twitter"
            stroke="#1DA1F2"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="facebook"
            name="Facebook"
            stroke="#4267B2"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="reddit"
            name="Reddit"
            stroke="#FF4500"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="news"
            name="News"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span style={{ color: "#e5e7eb" }}>{value}</span>}
          />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <ChartTooltipHeader>{label}</ChartTooltipHeader>
                    {payload.map((entry, index) => (
                      <ChartTooltipItem key={`item-${index}`} label={entry.name} color={entry.color}>
                        {entry.value}%
                      </ChartTooltipItem>
                    ))}
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
        </LineChart>
      </Chart>
    </ResponsiveContainer>
  )
}
