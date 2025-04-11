"use client"
import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import { Treemap, ResponsiveContainer } from "recharts"

// Sample data for the heatmap
const getHeatmapData = (company: string) => {
  if (company === "Nike") {
    return [
      {
        name: "Social Media",
        children: [
          { name: "Twitter", size: 1200, value: 75, sentiment: "positive" },
          { name: "Facebook", size: 800, value: 65, sentiment: "positive" },
          { name: "Instagram", size: 1500, value: 82, sentiment: "positive" },
          { name: "TikTok", size: 1000, value: 78, sentiment: "positive" },
        ],
      },
      {
        name: "News",
        children: [
          { name: "CNN", size: 500, value: 60, sentiment: "neutral" },
          { name: "Fox", size: 400, value: 55, sentiment: "neutral" },
          { name: "MSNBC", size: 300, value: 62, sentiment: "positive" },
          { name: "BBC", size: 450, value: 68, sentiment: "positive" },
        ],
      },
      {
        name: "Forums",
        children: [
          { name: "Reddit", size: 700, value: 45, sentiment: "negative" },
          { name: "Quora", size: 300, value: 58, sentiment: "neutral" },
          { name: "Discord", size: 400, value: 52, sentiment: "neutral" },
        ],
      },
      {
        name: "Reviews",
        children: [
          { name: "Amazon", size: 600, value: 72, sentiment: "positive" },
          { name: "Trustpilot", size: 400, value: 68, sentiment: "positive" },
          { name: "Google", size: 500, value: 70, sentiment: "positive" },
        ],
      },
    ]
  } else if (company === "Facebook") {
    return [
      {
        name: "Social Media",
        children: [
          { name: "Twitter", size: 1500, value: 40, sentiment: "negative" },
          { name: "Instagram", size: 1200, value: 65, sentiment: "positive" },
          { name: "TikTok", size: 900, value: 45, sentiment: "negative" },
        ],
      },
      {
        name: "News",
        children: [
          { name: "CNN", size: 600, value: 35, sentiment: "negative" },
          { name: "Fox", size: 500, value: 42, sentiment: "negative" },
          { name: "MSNBC", size: 400, value: 38, sentiment: "negative" },
          { name: "BBC", size: 550, value: 40, sentiment: "negative" },
        ],
      },
      {
        name: "Forums",
        children: [
          { name: "Reddit", size: 800, value: 30, sentiment: "negative" },
          { name: "Quora", size: 400, value: 45, sentiment: "negative" },
          { name: "Discord", size: 500, value: 38, sentiment: "negative" },
        ],
      },
      {
        name: "Reviews",
        children: [
          { name: "Trustpilot", size: 450, value: 48, sentiment: "negative" },
          { name: "Google", size: 550, value: 52, sentiment: "neutral" },
        ],
      },
    ]
  } else {
    return [
      {
        name: "Social Media",
        children: [
          { name: "Twitter", size: 1100, value: 42, sentiment: "negative" },
          { name: "Facebook", size: 900, value: 48, sentiment: "negative" },
          { name: "Instagram", size: 1300, value: 55, sentiment: "neutral" },
          { name: "TikTok", size: 800, value: 50, sentiment: "neutral" },
        ],
      },
      {
        name: "News",
        children: [
          { name: "CNN", size: 550, value: 40, sentiment: "negative" },
          { name: "Fox", size: 450, value: 45, sentiment: "negative" },
          { name: "MSNBC", size: 350, value: 42, sentiment: "negative" },
          { name: "BBC", size: 500, value: 38, sentiment: "negative" },
        ],
      },
      {
        name: "Forums",
        children: [
          { name: "Reddit", size: 750, value: 35, sentiment: "negative" },
          { name: "Quora", size: 350, value: 48, sentiment: "negative" },
          { name: "Discord", size: 450, value: 42, sentiment: "negative" },
        ],
      },
      {
        name: "Reviews",
        children: [
          { name: "Amazon", size: 650, value: 58, sentiment: "neutral" },
          { name: "Trustpilot", size: 450, value: 52, sentiment: "neutral" },
          { name: "Google", size: 550, value: 55, sentiment: "neutral" },
        ],
      },
    ]
  }
}

// Custom color based on sentiment value
const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "#22c55e"
    case "neutral":
      return "#f59e0b"
    case "negative":
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

export function SentimentHeatmap({ company }: { company: string }) {
  const data = {
    name: "root",
    children: getHeatmapData(company),
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart>
        <Treemap
          data={data}
          dataKey="size"
          stroke="#374151"
          fill="#6b7280"
          animationDuration={500}
          content={({ root, x, y, width, height, depth, index, payload, colors, rank, name }) => {
            if (!root.children || !root.children[index]) return null

            const category = root.children[index]
            const items = category.children || []

            return (
              <g>
                {items.map((item: any, i: number) => {
                  const itemX = x + (width / items.length) * i
                  const itemWidth = width / items.length
                  const itemHeight =
                    height * (item.size / category.children.reduce((sum: number, child: any) => sum + child.size, 0))
                  const itemY = y + height - itemHeight

                  return (
                    <g key={`${category.name}-${item.name}`}>
                      <rect
                        x={itemX}
                        y={itemY}
                        width={itemWidth}
                        height={itemHeight}
                        style={{
                          fill: getSentimentColor(item.sentiment),
                          stroke: "#374151",
                          strokeWidth: 1,
                        }}
                      />
                      {itemWidth > 30 && itemHeight > 30 && (
                        <>
                          <text
                            x={itemX + itemWidth / 2}
                            y={itemY + itemHeight / 2 - 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              fontSize: 12,
                              fontWeight: "bold",
                              fill: "#fff",
                              pointerEvents: "none",
                            }}
                          >
                            {item.name}
                          </text>
                          <text
                            x={itemX + itemWidth / 2}
                            y={itemY + itemHeight / 2 + 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              fontSize: 10,
                              fill: "#fff",
                              pointerEvents: "none",
                            }}
                          >
                            {item.value}%
                          </text>
                        </>
                      )}
                    </g>
                  )
                })}
                <text
                  x={x + 5}
                  y={y + 15}
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    fill: "#fff",
                    pointerEvents: "none",
                  }}
                >
                  {category.name}
                </text>
              </g>
            )
          }}
        >
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <ChartTooltipContent>
                    <ChartTooltipHeader>{data.name}</ChartTooltipHeader>
                    <ChartTooltipItem label="Sentiment">
                      {data.value}% ({data.sentiment})
                    </ChartTooltipItem>
                    <ChartTooltipItem label="Mentions">{data.size}</ChartTooltipItem>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
        </Treemap>
      </Chart>
    </ResponsiveContainer>
  )
}
