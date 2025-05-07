"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    keyword: "Innovation",
    sentiment: 85,
    volume: 320,
  },
  {
    keyword: "Quality",
    sentiment: 78,
    volume: 280,
  },
  {
    keyword: "Service",
    sentiment: 65,
    volume: 240,
  },
  {
    keyword: "Price",
    sentiment: 45,
    volume: 190,
  },
  {
    keyword: "Support",
    sentiment: 72,
    volume: 170,
  },
  {
    keyword: "Technology",
    sentiment: 82,
    volume: 150,
  },
  {
    keyword: "Product",
    sentiment: 75,
    volume: 140,
  },
  {
    keyword: "Features",
    sentiment: 68,
    volume: 130,
  },
  {
    keyword: "Design",
    sentiment: 80,
    volume: 120,
  },
  {
    keyword: "Performance",
    sentiment: 76,
    volume: 110,
  },
]

export function KeywordSentimentChart() {
  const getBarColor = (sentiment) => {
    if (sentiment >= 70) return "#4ade80"
    if (sentiment >= 50) return "#facc15"
    return "#f87171"
  }

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
