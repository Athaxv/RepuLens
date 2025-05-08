"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Jan", "Your Company": 65, "TechVision Inc.": 60, "Nexus Solutions": 55, "GlobalTech Partners": 50 },
  { month: "Feb", "Your Company": 68, "TechVision Inc.": 62, "Nexus Solutions": 58, "GlobalTech Partners": 52 },
  { month: "Mar", "Your Company": 72, "TechVision Inc.": 65, "Nexus Solutions": 60, "GlobalTech Partners": 55 },
  { month: "Apr", "Your Company": 75, "TechVision Inc.": 70, "Nexus Solutions": 62, "GlobalTech Partners": 58 },
  { month: "May", "Your Company": 80, "TechVision Inc.": 75, "Nexus Solutions": 65, "GlobalTech Partners": 60 },
  { month: "Jun", "Your Company": 85, "TechVision Inc.": 80, "Nexus Solutions": 68, "GlobalTech Partners": 62 },
  { month: "Jul", "Your Company": 88, "TechVision Inc.": 85, "Nexus Solutions": 70, "GlobalTech Partners": 65 },
  { month: "Aug", "Your Company": 90, "TechVision Inc.": 88, "Nexus Solutions": 72, "GlobalTech Partners": 68 },
  { month: "Sep", "Your Company": 92, "TechVision Inc.": 90, "Nexus Solutions": 75, "GlobalTech Partners": 70 },
  { month: "Oct", "Your Company": 95, 'T  90, "Nexus Solutions': 75, "GlobalTech Partners": 70 },
  { month: "Oct", "Your Company": 95, "TechVision Inc.": 92, "Nexus Solutions": 78, "GlobalTech Partners": 72 },
  { month: "Nov", "Your Company": 98, "TechVision Inc.": 94, "Nexus Solutions": 80, "GlobalTech Partners": 75 },
  { month: "Dec", "Your Company": 100, "TechVision Inc.": 95, "Nexus Solutions": 82, "GlobalTech Partners": 78 },
]

export function CompetitorGrowthChart() {
  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                    <p className="mb-2 font-medium">{label}</p>
                    {payload.map((entry, index) => (
                      <div key={`growth-${index}`} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                          <span className="text-sm">{entry.name}:</span>
                        </div>
                        <span className="font-medium">{entry.value}</span>
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
            dataKey="Your Company"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="TechVision Inc."
            stroke="#60a5fa"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Nexus Solutions"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="GlobalTech Partners"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
