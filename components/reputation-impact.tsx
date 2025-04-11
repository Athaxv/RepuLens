"use client"

import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for reputation impact
const getImpactData = (company: string) => {
  if (company === "Nike") {
    return {
      lineData: [
        { date: "Apr 1", sentiment: 65, stock: 120 },
        { date: "Apr 5", sentiment: 68, stock: 122 },
        { date: "Apr 10", sentiment: 75, stock: 128 },
        { date: "Apr 15", sentiment: 72, stock: 125 },
        { date: "Apr 20", sentiment: 70, stock: 124 },
        { date: "Apr 25", sentiment: 75, stock: 130 },
        { date: "Apr 30", sentiment: 78, stock: 135 },
      ],
      scatterData: [
        { sentiment: 65, stock: 120, impact: "low" },
        { sentiment: 68, stock: 122, impact: "low" },
        { sentiment: 75, stock: 128, impact: "medium" },
        { sentiment: 72, stock: 125, impact: "medium" },
        { sentiment: 70, stock: 124, impact: "low" },
        { sentiment: 75, stock: 130, impact: "medium" },
        { sentiment: 78, stock: 135, impact: "high" },
        { sentiment: 80, stock: 138, impact: "high" },
        { sentiment: 82, stock: 142, impact: "high" },
        { sentiment: 76, stock: 132, impact: "medium" },
        { sentiment: 74, stock: 128, impact: "medium" },
        { sentiment: 72, stock: 126, impact: "medium" },
        { sentiment: 70, stock: 122, impact: "low" },
        { sentiment: 68, stock: 118, impact: "low" },
      ],
    }
  } else if (company === "Facebook") {
    return {
      lineData: [
        { date: "Apr 1", sentiment: 40, stock: 280 },
        { date: "Apr 5", sentiment: 38, stock: 275 },
        { date: "Apr 10", sentiment: 35, stock: 265 },
        { date: "Apr 15", sentiment: 32, stock: 255 },
        { date: "Apr 20", sentiment: 30, stock: 245 },
        { date: "Apr 25", sentiment: 35, stock: 260 },
        { date: "Apr 30", sentiment: 40, stock: 270 },
      ],
      scatterData: [
        { sentiment: 40, stock: 280, impact: "medium" },
        { sentiment: 38, stock: 275, impact: "medium" },
        { sentiment: 35, stock: 265, impact: "high" },
        { sentiment: 32, stock: 255, impact: "high" },
        { sentiment: 30, stock: 245, impact: "high" },
        { sentiment: 35, stock: 260, impact: "medium" },
        { sentiment: 40, stock: 270, impact: "medium" },
        { sentiment: 42, stock: 285, impact: "medium" },
        { sentiment: 45, stock: 290, impact: "low" },
        { sentiment: 38, stock: 270, impact: "medium" },
        { sentiment: 35, stock: 260, impact: "high" },
        { sentiment: 32, stock: 250, impact: "high" },
        { sentiment: 30, stock: 240, impact: "high" },
        { sentiment: 28, stock: 235, impact: "high" },
      ],
    }
  } else {
    return {
      lineData: [
        { date: "Apr 1", sentiment: 45, stock: 95 },
        { date: "Apr 5", sentiment: 42, stock: 92 },
        { date: "Apr 10", sentiment: 40, stock: 90 },
        { date: "Apr 15", sentiment: 38, stock: 88 },
        { date: "Apr 20", sentiment: 42, stock: 91 },
        { date: "Apr 25", sentiment: 45, stock: 94 },
        { date: "Apr 30", sentiment: 48, stock: 97 },
      ],
      scatterData: [
        { sentiment: 45, stock: 95, impact: "medium" },
        { sentiment: 42, stock: 92, impact: "medium" },
        { sentiment: 40, stock: 90, impact: "medium" },
        { sentiment: 38, stock: 88, impact: "high" },
        { sentiment: 42, stock: 91, impact: "medium" },
        { sentiment: 45, stock: 94, impact: "medium" },
        { sentiment: 48, stock: 97, impact: "low" },
        { sentiment: 50, stock: 100, impact: "low" },
        { sentiment: 52, stock: 102, impact: "low" },
        { sentiment: 46, stock: 95, impact: "medium" },
        { sentiment: 44, stock: 93, impact: "medium" },
        { sentiment: 42, stock: 91, impact: "medium" },
        { sentiment: 40, stock: 89, impact: "medium" },
        { sentiment: 38, stock: 87, impact: "high" },
      ],
    }
  }
}

// Get impact color
const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "#ef4444"
    case "medium":
      return "#f59e0b"
    case "low":
      return "#10b981"
    default:
      return "#6b7280"
  }
}

export function ReputationImpact({ company }: { company: string }) {
  const data = getImpactData(company)

  return (
    <Tabs defaultValue="line" className="w-full h-full">
      <div className="flex justify-center mb-4">
        <TabsList>
          <TabsTrigger value="line">Timeline</TabsTrigger>
          <TabsTrigger value="scatter">Correlation</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="line" className="h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart>
            <LineChart data={data.lineData}>
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
      </TabsContent>

      <TabsContent value="scatter" className="h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="sentiment"
                name="Sentiment"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 5", "dataMax + 5"]}
                type="number"
                label={{ value: "Sentiment Score (%)", position: "insideBottom", offset: -5, fill: "#6b7280" }}
              />
              <YAxis
                dataKey="stock"
                name="Stock Price"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 10", "dataMax + 10"]}
                label={{ value: "Stock Price ($)", angle: -90, position: "insideLeft", fill: "#6b7280" }}
              />
              <ZAxis range={[60, 60]} />
              <Scatter
                name="Impact"
                data={data.scatterData}
                fill="#8884d8"
                shape={(props) => {
                  const { cx, cy, payload } = props
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={8}
                      fill={getImpactColor(payload.impact)}
                      fillOpacity={0.6}
                      stroke={getImpactColor(payload.impact)}
                    />
                  )
                }}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <ChartTooltipContent>
                        <ChartTooltipHeader>Correlation Data</ChartTooltipHeader>
                        <ChartTooltipItem label="Sentiment">{data.sentiment}%</ChartTooltipItem>
                        <ChartTooltipItem label="Stock Price">${data.stock}</ChartTooltipItem>
                        <ChartTooltipItem label="Impact" color={getImpactColor(data.impact)}>
                          {data.impact.charAt(0).toUpperCase() + data.impact.slice(1)}
                        </ChartTooltipItem>
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
            </ScatterChart>
          </Chart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}
