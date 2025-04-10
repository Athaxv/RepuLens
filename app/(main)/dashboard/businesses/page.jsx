"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Clock,
  Download,
  FileText,
  LogOut,
  MessageSquare,
  Mic,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ThumbsUp,
  TrendingUp,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SentimentHeatmap } from "@/components/sentiment-heatmap"
import { SentimentTrend } from "@/components/sentiment-trend"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { ReputationImpact } from "@/components/reputation-impact"
import { CrisisSimulator } from "@/components/crisis-simulator"
import { BusinessDashboardHeader } from "@/components/business-dashboard-header"
import { CompanySelector } from "@/components/company-selector"
import { DateRangePicker } from "@/components/date-range-picker"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ActiveControversiesChart } from "@/components/active-controversies-chart"
import { SearchDialog } from "@/components/search-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function BusinessDashboard() {
  const [selectedCompany, setSelectedCompany] = useState("Nike")
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const handleSelectCompany = (company) => {
    setSelectedCompany(company.name)
    toast({
      title: "Company selected",
      description: `Dashboard updated for ${company.name}`,
    })
  }

  const handleSelectControversy = (controversy) => {
    // If the controversy is for the current company, just show a toast
    if (controversy.company === selectedCompany) {
      toast({
        title: "Controversy selected",
        description: `Viewing details for "${controversy.title}"`,
      })
    } else {
      // If it's for a different company, update the selected company
      setSelectedCompany(controversy.company)
      toast({
        title: "Company changed",
        description: `Switched to ${controversy.company} to view "${controversy.title}"`,
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>RepuLens</span>
            <Badge variant="outline" className="ml-2">
              Business
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-[300px] justify-start text-muted-foreground"
              onClick={() => setSearchDialogOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search companies, controversies...
            </Button>
            <CompanySelector
              value={selectedCompany}
              onValueChange={setSelectedCompany}
              companies={["Nike", "Facebook", "Nestle"]}
            />
            <DateRangePicker />
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice Commands</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI Assistant</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Reports</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <BusinessDashboardHeader company={selectedCompany} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
              <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Report
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72.4%</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                  <Progress value={72.4} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Controversies</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 high impact, 1 medium impact</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="destructive" className="text-xs">
                      Labor
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                      Environment
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Product
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Market Impact</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+3.2%</div>
                  <p className="text-xs text-muted-foreground">Stock price correlation with sentiment</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Updated 15 minutes ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Sentiment Trend</CardTitle>
                  <CardDescription>30-day sentiment analysis across platforms</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <SentimentTrend company={selectedCompany} />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Platform Heatmap</CardTitle>
                  <CardDescription>Sentiment distribution by social platform</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <SentimentHeatmap company={selectedCompany} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Controversies Impact</CardTitle>
                  <CardDescription>Current controversies and their impact on brand reputation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActiveControversiesChart company={selectedCompany} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Competitor Benchmarking</CardTitle>
                  <CardDescription>Reputation comparison with industry competitors</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <CompetitorComparison company={selectedCompany} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Impact</CardTitle>
                  <CardDescription>Correlation between sentiment and stock price</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ReputationImpact company={selectedCompany} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Crisis Simulator</CardTitle>
                  <CardDescription>Simulate potential reputation crises and mitigation strategies</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <CrisisSimulator company={selectedCompany} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Sentiment Analysis</CardTitle>
                <CardDescription>Comprehensive sentiment breakdown across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  Detailed sentiment analysis content would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>Detailed comparison with industry competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  Competitor analysis content would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crisis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crisis Management</CardTitle>
                <CardDescription>Tools for crisis detection, simulation, and mitigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  Crisis management tools would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Reports</CardTitle>
                <CardDescription>Generate and schedule custom reputation reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  Custom reports interface would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="w-full border-t py-2">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <p className="text-xs text-muted-foreground">© 2025 RepuLens. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Data refreshed: Today at 14:30</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Version 2.4.1</span>
          </div>
        </div>
      </footer>

      <SearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
        onSelectCompany={handleSelectCompany}
        onSelectControversy={handleSelectControversy}
      />
    </div>
  )
}
