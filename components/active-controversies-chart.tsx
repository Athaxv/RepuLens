"use client"

import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Sample data for active controversies
const getControversiesData = (company: string) => {
  if (company === "Nike") {
    return [
      {
        name: "Labor Practices",
        impact: 75,
        description: "Reports of poor working conditions in manufacturing facilities in Vietnam",
        category: "Labor",
      },
      {
        name: "Environmental Impact",
        impact: 60,
        description: "Criticism of carbon footprint and waste from production processes",
        category: "Environment",
      },
      {
        name: "Product Quality",
        impact: 45,
        description: "Reports of quality issues with premium basketball shoe line",
        category: "Product",
      },
    ]
  } else if (company === "Facebook") {
    return [
      {
        name: "Data Privacy",
        impact: 85,
        description: "Major data breach affecting millions of users' personal information",
        category: "Privacy",
      },
      {
        name: "Content Moderation",
        impact: 80,
        description: "Platform used to spread harmful misinformation during election period",
        category: "Content",
      },
      {
        name: "Antitrust Investigation",
        impact: 75,
        description: "Government investigation into anti-competitive business practices",
        category: "Legal",
      },
      {
        name: "Workplace Culture",
        impact: 65,
        description: "Reports of toxic workplace environment and discrimination",
        category: "Workplace",
      },
      {
        name: "User Addiction",
        impact: 60,
        description: "Concerns about addictive platform design and mental health impacts",
        category: "Health",
      },
    ]
  } else {
    return [
      {
        name: "Water Extraction",
        impact: 80,
        description: "Criticism of water extraction in drought-prone regions",
        category: "Environment",
      },
      {
        name: "Palm Oil Sourcing",
        impact: 70,
        description: "Reports of deforestation linked to palm oil suppliers",
        category: "Environment",
      },
      {
        name: "Product Safety",
        impact: 65,
        description: "Health concerns related to chemicals in packaging materials",
        category: "Product",
      },
      {
        name: "Child Labor",
        impact: 75,
        description: "Allegations of child labor in cocoa supply chain",
        category: "Labor",
      },
    ]
  }
}

// Get impact color based on severity
const getImpactColor = (impact: number) => {
  if (impact >= 75) return "#ef4444" // High impact - red
  if (impact >= 50) return "#f59e0b" // Medium impact - amber
  return "#10b981" // Low impact - green
}

export function ActiveControversiesChart({ company }: { company: string }) {
  const data = getControversiesData(company)

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height={300}>
        <Chart>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Bar
              dataKey="impact"
              name="Impact Score"
              radius={[0, 4, 4, 0]}
              shape={(props) => {
                const { x, y, width, height, value } = props
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getImpactColor(value as number)}
                    radius={[0, 4, 4, 0]}
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
                      <ChartTooltipHeader>{data.name}</ChartTooltipHeader>
                      <ChartTooltipItem label="Impact Score" color={getImpactColor(data.impact)}>
                        {data.impact}%
                      </ChartTooltipItem>
                      <ChartTooltipItem label="Category">{data.category}</ChartTooltipItem>
                      <div className="mt-2 text-xs">{data.description}</div>
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
          </BarChart>
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
