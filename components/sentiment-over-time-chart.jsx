"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { date: "Jan 1", positive: 65, neutral: 25, negative: 10, overall: 78 },
  { date: "Jan 8", positive: 60, neutral: 28, negative: 12, overall: 74 },
  { date: "Jan 15", positive: 70, neutral: 20, negative: 10, overall: 80 },
  { date: "Jan 22", positive: 68, neutral: 22, negative: 10, overall: 79 },
  { date: "Jan 29", positive: 65, neutral: 25, negative: 10, overall: 78 },
  { date: "Feb 5", positive: 75, neutral: 15, negative: 10, overall: 83 },
  { date: "Feb 12", positive: 72, neutral: 18, negative: 10, overall: 81 },
  { date: "Feb 19", positive: 70, neutral: 20, negative: 10, overall: 80 },
  { date: "Feb 26", positive: 68, neutral: 22, negative: 10, overall: 79 },
  { date: "Mar 5", positive: 75, neutral: 15, negative: 10, overall: 83 },
  { date: "Mar 12", positive: 80, neutral: 12, negative: 8, overall: 86 },
  { date: "Mar 19", positive: 78, neutral: 14, negative: 8, overall: 85 },
]

export function SentimentOverTimeChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
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
            dataKey="overall"
            name="Overall"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="positive"
            name="Positive"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="neutral"
            name="Neutral"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="negative"
            name="Negative"
            stroke="#f87171"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
