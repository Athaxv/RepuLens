"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Positive", value: 65, color: "#4ade80" },
  { name: "Neutral", value: 25, color: "#94a3b8" },
  { name: "Negative", value: 10, color: "#f87171" },
]

export function SentimentBreakdownChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={60}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
                      <span className="font-medium">{payload[0].name}</span>
                    </div>
                    <div className="mt-1 text-sm">
                      <div className="flex justify-between gap-2">
                        <span>Percentage:</span>
                        <span className="font-medium">{payload[0].value}%</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Mentions:</span>
                        <span className="font-medium">{Math.round((payload[0].value / 100) * 2154)}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
