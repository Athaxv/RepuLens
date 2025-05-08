"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan", apple: 75, microsoft: 72, google: 70, amazon: 68 },
  { date: "Feb", apple: 76, microsoft: 73, google: 71, amazon: 69 },
  { date: "Mar", apple: 78, microsoft: 75, google: 72, amazon: 70 },
  { date: "Apr", apple: 80, microsoft: 77, google: 74, amazon: 72 },
  { date: "May", apple: 82, microsoft: 79, google: 76, amazon: 73 },
  { date: "Jun", apple: 83, microsoft: 80, google: 77, amazon: 72 },
  { date: "Jul", apple: 85, microsoft: 82, google: 79, amazon: 70 },
  { date: "Aug", apple: 84, microsoft: 81, google: 78, amazon: 69 },
  { date: "Sep", apple: 83, microsoft: 80, google: 77, amazon: 68 },
  { date: "Oct", apple: 82, microsoft: 79, google: 76, amazon: 67 },
  { date: "Nov", apple: 83, microsoft: 80, google: 77, amazon: 68 },
  { date: "Dec", apple: 85, microsoft: 82, google: 79, amazon: 68 },
]

export function CompetitorComparisonChart() {
  return (
    <div className="h-[350px] w-full">
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
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Apple</span>
                        <span className="font-bold text-[#0066CC]">{payload[0].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Microsoft</span>
                        <span className="font-bold text-[#7FBA00]">{payload[1].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Google</span>
                        <span className="font-bold text-[#4285F4]">{payload[2].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Amazon</span>
                        <span className="font-bold text-[#FF9900]">{payload[3].value}%</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="apple" stroke="#0066CC" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="microsoft" stroke="#7FBA00" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="google" stroke="#4285F4" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="amazon" stroke="#FF9900" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
