"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// interface SentimentSourcesChartProps {
//   detailed?: boolean
// }

const basicData = [
  {
    source: "Twitter",
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  {
    source: "Facebook",
    positive: 55,
    neutral: 30,
    negative: 15,
  },
  {
    source: "News",
    positive: 70,
    neutral: 20,
    negative: 10,
  },
  {
    source: "Reddit",
    positive: 45,
    neutral: 35,
    negative: 20,
  },
  {
    source: "YouTube",
    positive: 60,
    neutral: 25,
    negative: 15,
  },
]

const detailedData = [
  {
    source: "Twitter",
    positive: 65,
    neutral: 25,
    negative: 10,
    volume: 1200,
    engagement: 85,
  },
  {
    source: "Facebook",
    positive: 55,
    neutral: 30,
    negative: 15,
    volume: 850,
    engagement: 72,
  },
  {
    source: "LinkedIn",
    positive: 75,
    neutral: 20,
    negative: 5,
    volume: 450,
    engagement: 68,
  },
  {
    source: "News Sites",
    positive: 70,
    neutral: 20,
    negative: 10,
    volume: 320,
    engagement: 45,
  },
  {
    source: "Reddit",
    positive: 45,
    neutral: 35,
    negative: 20,
    volume: 780,
    engagement: 92,
  },
  {
    source: "YouTube",
    positive: 60,
    neutral: 25,
    negative: 15,
    volume: 520,
    engagement: 78,
  },
  {
    source: "Instagram",
    positive: 72,
    neutral: 18,
    negative: 10,
    volume: 680,
    engagement: 88,
  },
  {
    source: "Blogs",
    positive: 58,
    neutral: 32,
    negative: 10,
    volume: 240,
    engagement: 52,
  },
]

export function SentimentSourcesChart({ detailed = false }) {
  const data = detailed ? detailedData : basicData
  const height = detailed ? 500 : 400

  return (
    <div className={`h-[${height}px] w-full`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis dataKey="source" />
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
                        <span className="font-medium">
                          {entry.name === "Volume"
                            ? entry.value
                            : `${entry.value}${entry.name === "Engagement" ? "" : "%"}`}
                        </span>
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
          {detailed && (
            <>
              <Bar dataKey="volume" name="Volume" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} />
              <Bar dataKey="engagement" name="Engagement" fill="#60a5fa" radius={[4, 4, 4, 4]} />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
