"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Legend } from "recharts"

const data = [
  {
    subject: "Sentiment",
    "Your Company": 85,
    "TechVision Inc.": 72,
    "Nexus Solutions": 68,
    "GlobalTech Partners": 65,
    fullMark: 100,
  },
  {
    subject: "Growth",
    "Your Company": 78,
    "TechVision Inc.": 80,
    "Nexus Solutions": 65,
    "GlobalTech Partners": 70,
    fullMark: 100,
  },
  {
    subject: "Innovation",
    "Your Company": 90,
    "TechVision Inc.": 85,
    "Nexus Solutions": 75,
    "GlobalTech Partners": 80,
    fullMark: 100,
  },
  {
    subject: "Market Share",
    "Your Company": 65,
    "TechVision Inc.": 75,
    "Nexus Solutions": 60,
    "GlobalTech Partners": 55,
    fullMark: 100,
  },
  {
    subject: "Customer Satisfaction",
    "Your Company": 82,
    "TechVision Inc.": 75,
    "Nexus Solutions": 70,
    "GlobalTech Partners": 68,
    fullMark: 100,
  },
  {
    subject: "Brand Recognition",
    "Your Company": 70,
    "TechVision Inc.": 85,
    "Nexus Solutions": 65,
    "GlobalTech Partners": 60,
    fullMark: 100,
  },
]

export function CompetitorRadarChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Your Company"
            dataKey="Your Company"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
          <Radar name="TechVision Inc." dataKey="TechVision Inc." stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />
          <Radar name="Nexus Solutions" dataKey="Nexus Solutions" stroke="#4ade80" fill="#4ade80" fillOpacity={0.6} />
          <Radar
            name="GlobalTech Partners"
            dataKey="GlobalTech Partners"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
