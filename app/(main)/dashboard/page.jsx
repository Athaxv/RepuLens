"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Download, LineChart, LogOut, Menu, Search, Settings, Sparkles, User } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { CompanyDashboard } from "@/components/company-dashboard"
import { CompetitorDashboard } from "@/components/competitor-dashboard"
import { TopCompetitors } from "@/components/top-competitors"
import { RefreshButton } from "@/components/refresh-button"
import { AIAssistant } from "@/components/ai-assistant"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState("Sarah Johnson")
  // const [userType, setUserType] = useState("business")

  useEffect(() => {
    setMounted(true)
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate data fetching
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="container py-6 md:py-8 lg:py-10 px-5 px-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between ">
                {/* <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <RefreshButton /> */}
              </div>
              <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
              <p className="text-white/70">Here's what's happening with your company today</p>
            </motion.div>

            <Tabs defaultValue="company" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="border border-white/10 bg-white/5">
                  <TabsTrigger value="company" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Company Dashboard
                  </TabsTrigger>
                  <TabsTrigger
                    value="competitor"
                    className="data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    Competitor Dashboard
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  {/* Refresh Button */}
                  <RefreshButton
                    onRefresh={handleRefresh}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">Export</span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1 bg-white text-black hover:bg-white/90">
                    <LineChart className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">Generate Report</span>
                  </Button>
                </div>
              </div>

              <TabsContent value="company" className="space-y-6">
                <TopCompetitors isLoading={isLoading} />
                <CompanyDashboard isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="competitor" className="space-y-6">
                <CompetitorDashboard isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
  )
}
