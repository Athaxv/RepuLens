"use client"

import { Chart, ChartTooltip, ChartTooltipContent, ChartTooltipHeader, ChartTooltipItem } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for competitor comparison
const getComparisonData = (company: string) => {
  if (company === "Nike") {
    return {
      barData: [
        { name: "Overall", nike: 75, adidas: 70, puma: 65, underArmour: 62 },
        { name: "Social Media", nike: 80, adidas: 75, puma: 68, underArmour: 65 },
        { name: "News", nike: 72, adidas: 68, puma: 64, underArmour: 60 },
        { name: "Customer Reviews", nike: 78, adidas: 72, puma: 68, underArmour: 65 },
        { name: "Employee Sentiment", nike: 70, adidas: 65, puma: 60, underArmour: 58 },
      ],
      radarData: [
        { subject: "Product Quality", nike: 85, adidas: 80, puma: 75, underArmour: 72 },
        { subject: "Sustainability", nike: 80, adidas: 75, puma: 65, underArmour: 60 },
        { subject: "Labor Practices", nike: 65, adidas: 70, puma: 60, underArmour: 62 },
        { subject: "Innovation", nike: 90, adidas: 85, puma: 70, underArmour: 75 },
        { subject: "Customer Service", nike: 75, adidas: 70, puma: 65, underArmour: 60 },
        { subject: "Marketing", nike: 90, adidas: 85, puma: 75, underArmour: 70 },
      ],
    }
  } else if (company === "Facebook") {
    return {
      barData: [
        { name: "Overall", facebook: 45, twitter: 60, linkedin: 75, tiktok: 65 },
        { name: "Social Media", facebook: 40, twitter: 65, linkedin: 78, tiktok: 70 },
        { name: "News", facebook: 35, twitter: 55, linkedin: 72, tiktok: 60 },
        { name: "Customer Reviews", facebook: 48, twitter: 62, linkedin: 76, tiktok: 68 },
        { name: "Employee Sentiment", facebook: 52, twitter: 58, linkedin: 74, tiktok: 62 },
      ],
      radarData: [
        { subject: "Privacy", facebook: 30, twitter: 45, linkedin: 70, tiktok: 35 },
        { subject: "User Experience", facebook: 65, twitter: 70, linkedin: 80, tiktok: 75 },
        { subject: "Content Moderation", facebook: 40, twitter: 50, linkedin: 75, tiktok: 45 },
        { subject: "Innovation", facebook: 75, twitter: 70, linkedin: 80, tiktok: 85 },
        { subject: "Transparency", facebook: 35, twitter: 50, linkedin: 75, tiktok: 40 },
        { subject: "Data Security", facebook: 45, twitter: 55, linkedin: 80, tiktok: 50 },
      ],
    }
  } else {
    return {
      barData: [
        { name: "Overall", nestle: 50, danone: 65, unilever: 70, kraft: 60 },
        { name: "Social Media", nestle: 45, danone: 60, unilever: 68, kraft: 55 },
        { name: "News", nestle: 42, danone: 62, unilever: 65, kraft: 58 },
        { name: "Customer Reviews", nestle: 48, danone: 64, unilever: 70, kraft: 60 },
        { name: "Employee Sentiment", nestle: 52, danone: 68, unilever: 72, kraft: 62 },
      ],
      radarData: [
        { subject: "Product Quality", nestle: 65, danone: 70, unilever: 75, kraft: 68 },
        { subject: "Sustainability", nestle: 45, danone: 65, unilever: 72, kraft: 55 },
        { subject: "Labor Practices", nestle: 40, danone: 60, unilever: 65, kraft: 58 },
        { subject: "Innovation", nestle: 60, danone: 65, unilever: 75, kraft: 62 },
        { subject: "Customer Service", nestle: 55, danone: 65, unilever: 70, kraft: 60 },
        { subject: "Marketing", nestle: 70, danone: 68, unilever: 75, kraft: 65 },
      ],
    }
  }
}

export function CompetitorComparison({ company }: { company: string }) {
  const data = getComparisonData(company)

  return (
    <Tabs defaultValue="bar" className="w-full h-full">
      <div className="flex justify-center mb-4">
        <TabsList>
          <TabsTrigger value="bar">Bar Comparison</TabsTrigger>
          <TabsTrigger value="radar">Radar Analysis</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="bar" className="h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart>
            <BarChart data={data.barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              {company === "Nike" ? (
                <>
                  <Bar dataKey="nike" name="Nike" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="adidas" name="Adidas" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="puma" name="Puma" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="underArmour" name="Under Armour" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </>
              ) : company === "Facebook" ? (
                <>
                  <Bar dataKey="facebook" name="Facebook" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="twitter" name="Twitter" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="linkedin" name="LinkedIn" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tiktok" name="TikTok" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </>
              ) : (
                <>
                  <Bar dataKey="nestle" name="Nestle" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="danone" name="Danone" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="unilever" name="Unilever" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="kraft" name="Kraft" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </>
              )}
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
                        {payload.map((entry, index) => (
                          <ChartTooltipItem key={`item-${index}`} label={entry.name} color={entry.color}>
                            {entry.value}%
                          </ChartTooltipItem>
                        ))}
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
            </BarChart>
          </Chart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="radar" className="h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart>
            <RadarChart data={data.radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={12} tickLine={false} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              {company === "Nike" ? (
                <>
                  <Radar name="Nike" dataKey="nike" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Adidas" dataKey="adidas" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Puma" dataKey="puma" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Under Armour" dataKey="underArmour" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                </>
              ) : company === "Facebook" ? (
                <>
                  <Radar name="Facebook" dataKey="facebook" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Twitter" dataKey="twitter" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="LinkedIn" dataKey="linkedin" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="TikTok" dataKey="tiktok" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                </>
              ) : (
                <>
                  <Radar name="Nestle" dataKey="nestle" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Danone" dataKey="danone" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Unilever" dataKey="unilever" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Kraft" dataKey="kraft" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                </>
              )}
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
                        <ChartTooltipHeader>{payload[0].payload.subject}</ChartTooltipHeader>
                        {payload.map((entry, index) => (
                          <ChartTooltipItem key={`item-${index}`} label={entry.name} color={entry.color}>
                            {entry.value}%
                          </ChartTooltipItem>
                        ))}
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
            </RadarChart>
          </Chart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}
