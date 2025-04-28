"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", actual: 68, predicted: 68 },
  { month: "Feb", actual: 70, predicted: 70 },
  { month: "Mar", actual: 72, predicted: 72 },
  { month: "Apr", actual: 74, predicted: 74 },
  { month: "May", actual: 76, predicted: 76 },
  { month: "Jun", actual: 78, predicted: 78 },
  { month: "Jul", actual: null, predicted: 82 },
  { month: "Aug", actual: null, predicted: 85 },
  { month: "Sep", actual: null, predicted: 88 },
  { month: "Oct", actual: null, predicted: 90 },
  { month: "Nov", actual: null, predicted: 92 },
  { month: "Dec", actual: null, predicted: 94 },
]

export function GrowthChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff20" />
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-white/10 bg-black/90 p-2 shadow-sm backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">Month</span>
                        <span className="font-bold text-white/70">{payload[0]?.payload?.month || "N/A"}</span>
                      </div>
                      {payload[0]?.payload?.actual !== null && payload[0]?.payload?.actual !== undefined && (
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-white/50">Actual</span>
                          <span className="font-bold text-blue-400">{payload[0]?.value || "N/A"}</span>
                        </div>
                      )}
                      {payload[1] && (
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-white/50">Predicted</span>
                          <span className="font-bold text-amber-300">{payload[1]?.value || "N/A"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#60A5FA"
            fillOpacity={1}
            fill="url(#colorActual)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#F59E0B"
            fillOpacity={1}
            fill="url(#colorPredicted)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
