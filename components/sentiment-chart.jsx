"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan", twitter: 65, reddit: 58, news: 80, overall: 68 },
  { date: "Feb", twitter: 68, reddit: 60, news: 82, overall: 70 },
  { date: "Mar", twitter: 70, reddit: 65, news: 81, overall: 72 },
  { date: "Apr", twitter: 72, reddit: 70, news: 80, overall: 74 },
  { date: "May", twitter: 75, reddit: 72, news: 82, overall: 76 },
  { date: "Jun", twitter: 78, reddit: 75, news: 85, overall: 78 },
  { date: "Jul", twitter: 80, reddit: 78, news: 88, overall: 82 },
  { date: "Aug", twitter: 82, reddit: 80, news: 87, overall: 83 },
  { date: "Sep", twitter: 80, reddit: 78, news: 85, overall: 81 },
  { date: "Oct", twitter: 78, reddit: 75, news: 83, overall: 78 },
  { date: "Nov", twitter: 75, reddit: 72, news: 80, overall: 76 },
  { date: "Dec", twitter: 78, reddit: 75, news: 82, overall: 78 },
]

export function SentimentChart() {
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
                  <div className="rounded-lg border border-white/10 bg-black/90 p-2 shadow-sm backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">Date</span>
                        <span className="font-bold text-white/70">{payload[0].payload.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">Overall</span>
                        <span className="font-bold text-amber-300">{payload[3].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">Twitter</span>
                        <span className="font-bold text-[#1DA1F2]">{payload[0].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">Reddit</span>
                        <span className="font-bold text-[#FF4500]">{payload[1].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-white/50">News</span>
                        <span className="font-bold text-[#4CAF50]">{payload[2].value}%</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="reddit" stroke="#FF4500" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="news" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="overall" stroke="#F59E0B" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
