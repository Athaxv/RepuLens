"use client"

import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Sample data for stock correlation
const stockCorrelationData = {
  Nike: [
    { date: "Apr 1", sentiment: 65, stock: 120 },
    { date: "Apr 5", sentiment: 68, stock: 122 },
    { date: "Apr 10", sentiment: 75, stock: 128 },
    { date: "Apr 15", sentiment: 72, stock: 125 },
    { date: "Apr 20", sentiment: 70, stock: 124 },
    { date: "Apr 25", sentiment: 75, stock: 130 },
    { date: "Apr 30", sentiment: 78, stock: 135 },
  ],
  Facebook: [
    { date: "Apr 1", sentiment: 40, stock: 280 },
    { date: "Apr 5", sentiment: 38, stock: 275 },
    { date: "Apr 10", sentiment: 35, stock: 265 },
    { date: "Apr 15", sentiment: 32, stock: 255 },
    { date: "Apr 20", sentiment: 30, stock: 245 },
    { date: "Apr 25", sentiment: 35, stock: 260 },
    { date: "Apr 30", sentiment: 40, stock: 270 },
  ],
  Nestle: [
    { date: "Apr 1", sentiment: 45, stock: 95 },
    { date: "Apr 5", sentiment: 42, stock: 92 },
    { date: "Apr 10", sentiment: 40, stock: 90 },
    { date: "Apr 15", sentiment: 38, stock: 88 },
    { date: "Apr 20", sentiment: 42, stock: 91 },
    { date: "Apr 25", sentiment: 45, stock: 94 },
    { date: "Apr 30", sentiment: 48, stock: 97 },
  ],
  Tesla: [
    { date: "Apr 1", sentiment: 70, stock: 180 },
    { date: "Apr 5", sentiment: 65, stock: 175 },
    { date: "Apr 10", sentiment: 60, stock: 165 },
    { date: "Apr 15", sentiment: 55, stock: 155 },
    { date: "Apr 20", sentiment: 60, stock: 160 },
    { date: "Apr 25", sentiment: 65, stock: 170 },
    { date: "Apr 30", sentiment: 70, stock: 180 },
  ],
  Amazon: [
    { date: "Apr 1", sentiment: 75, stock: 3200 },
    { date: "Apr 5", sentiment: 72, stock: 3180 },
    { date: "Apr 10", sentiment: 70, stock: 3150 },
    { date: "Apr 15", sentiment: 68, stock: 3120 },
    { date: "Apr 20", sentiment: 72, stock: 3160 },
    { date: "Apr 25", sentiment: 75, stock: 3200 },
    { date: "Apr 30", sentiment: 78, stock: 3250 },
  ],
}

export function StockCorrelation() {
  const [selectedCompany, setSelectedCompany] = useState("Nike")
  const data = stockCorrelationData[selectedCompany as keyof typeof stockCorrelationData]

  return (
    <div className="h-full">
      <div className="mb-4">
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Facebook">Facebook (Meta)</SelectItem>
            <SelectItem value="Nestle">Nestle</SelectItem>
            <SelectItem value="Tesla">Tesla</SelectItem>
            <SelectItem value="Amazon">Amazon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <Chart>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={["dataMin - 10", "dataMax + 10"]}
              tickFormatter={(value) => `$${value}`}
            />
            <Line yAxisId="left" type="monotone" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sentiment"
              name="Sentiment"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="stock"
              name="Stock Price"
              stroke="#10b981"
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
                      <ChartTooltipItem label="Sentiment" color="#3b82f6">
                        {payload[0].value}%
                      </ChartTooltipItem>
                      <ChartTooltipItem label="Stock Price" color="#10b981">
                        ${payload[1].value}
                      </ChartTooltipItem>
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
          </LineChart>
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
