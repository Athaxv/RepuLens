"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Apple", value: 85 },
  { name: "Microsoft", value: 82 },
  { name: "Google", value: 79 },
  { name: "Samsung", value: 76 },
  { name: "IBM", value: 74 },
  { name: "Amazon", value: 68 },
  { name: "Meta", value: 65 },
  { name: "Intel", value: 62 },
]

export function SectorPerformanceChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 10,
            left: 70,
            bottom: 5,
          }}
        >
          <XAxis
            type="number"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Company</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                      <span className="text-[0.70rem] uppercase text-muted-foreground mt-1">Sentiment Score</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
