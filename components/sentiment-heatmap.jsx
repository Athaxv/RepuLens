"use client"

import { useState } from "react"
import { Tooltip, Treemap, ResponsiveContainer } from "recharts"

const COLORS = [
  "#f87171", // Red (most negative)
  "#fca5a5",
  "#fecaca",
  "#d1d5db", // Neutral
  "#bbf7d0",
  "#86efac",
  "#4ade80", // Green (most positive)
]

const data = [
  {
    name: "Product Quality",
    children: [
      { name: "Durability", size: 1200, sentiment: 85 },
      { name: "Materials", size: 800, sentiment: 78 },
      { name: "Design", size: 1000, sentiment: 82 },
      { name: "Functionality", size: 1100, sentiment: 75 },
    ],
  },
  {
    name: "Customer Service",
    children: [
      { name: "Response Time", size: 900, sentiment: 65 },
      { name: "Helpfulness", size: 700, sentiment: 72 },
      { name: "Problem Resolution", size: 800, sentiment: 68 },
      { name: "Follow-up", size: 600, sentiment: 70 },
    ],
  },
  {
    name: "Price",
    children: [
      { name: "Value", size: 1000, sentiment: 55 },
      { name: "Competitiveness", size: 800, sentiment: 60 },
      { name: "Discounts", size: 600, sentiment: 75 },
      { name: "Subscription Model", size: 700, sentiment: 45 },
    ],
  },
  {
    name: "User Experience",
    children: [
      { name: "Ease of Use", size: 1100, sentiment: 80 },
      { name: "Interface", size: 900, sentiment: 75 },
      { name: "Performance", size: 1000, sentiment: 72 },
      { name: "Features", size: 1200, sentiment: 85 },
    ],
  },
]

const getSentimentColor = (sentiment) => {
  // Map sentiment (0-100) to color index (0-6)
  const index = Math.min(Math.floor((sentiment / 100) * 7), 6)
  return COLORS[index]
}

const CustomizedContent = (props) => {
  const { root, depth, x, y, width, height, index, name, sentiment, colors } = props

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? getSentimentColor(sentiment) : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && width > 50 && height > 28 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-medium fill-foreground"
        >
          {name}
        </text>
      )}
    </g>
  )
}

export function SentimentHeatmap() {
  const [activeIndex, setActiveIndex] = useState(0)

  const processData = (data) => {
    return data.map((item) => {
      if (item.children) {
        return {
          ...item,
          children: item.children.map((child) => ({
            ...child,
            sentiment: child.sentiment || 50, // Default sentiment if not provided
          })),
        }
      }
      return {
        ...item,
        sentiment: item.sentiment || 50, // Default sentiment if not provided
      }
    })
  }

  const processedData = processData(data)

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={processedData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={COLORS} />}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border border-border bg-background p-3 shadow-md">
                    <div className="font-medium">{data.name}</div>
                    <div className="mt-1 text-sm">
                      <div className="flex justify-between gap-2">
                        <span>Sentiment:</span>
                        <span className="font-medium">{data.sentiment}%</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Mentions:</span>
                        <span className="font-medium">{data.size}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}
