"use client"

import { useState } from "react"
import {
  Bell,
  BookmarkPlus,
  Eye,
  Filter,
  LogOut,
  MessageSquare,
  Mic,
  Search,
  Settings,
  Shield,
  ThumbsDown,
  ThumbsUp,
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
import { CompanyProfile } from "@/components/company-profile"
import { TrendingControversies } from "@/components/trending-controversies"
import { StockCorrelation } from "@/components/stock-correlation"
import { ConsumerDashboardHeader } from "@/components/consumer-dashboard-header"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompanyWatchlist } from "@/components/company-watchlist"
import { SearchDialog } from "@/components/search-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function ConsumerDashboard() {
  const [selectedCompany, setSelectedCompany] = useState("Nike")
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("trending")
  const { toast } = useToast()

  const handleSelectCompany = (company) => {
    setSelectedCompany(company.name)
    setActiveTab("companies")
    toast({
      title: "Company selected",
      description: `Viewing profile for ${company.name}`,
    })
  }

  const handleSelectControversy = (controversy) => {
    setActiveTab("trending")
    toast({
      title: "Controversy selected",
      description: `Viewing details for "${controversy.title}"`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>RepuLens</span>
            <Badge variant="outline" className="ml-2">
              Consumer
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Watchlist</span>
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
      </header>
      <main className="flex-1 container py-6">
        <ConsumerDashboardHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
              <TabsTrigger value="viral">Viral Content</TabsTrigger>
              <TabsTrigger value="esg">ESG Tracking</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Add to Watchlist
              </Button>
            </div>
          </div>

          <TabsContent value="trending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Trending Controversies</CardTitle>
                  <CardDescription>Latest corporate controversies and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendingControversies />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Companies</CardTitle>
                  <CardDescription>Ranked by reputation score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {[
                        "Nike",
                        "Apple",
                        "Microsoft",
                        "Tesla",
                        "Amazon",
                        "Google",
                        "Facebook",
                        "Nestle",
                        "Coca-Cola",
                        "Pepsi",
                      ].map((company, index) => (
                        <div key={company} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{index + 1}.</div>
                            <div className="font-medium">{company}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.round(90 - index * 5)} className="w-24" />
                            <div className="text-sm">{Math.round(90 - index * 5)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Price Impact</CardTitle>
                  <CardDescription>Correlation between reputation and stock performance</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <StockCorrelation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent PR Campaigns</CardTitle>
                  <CardDescription>Latest corporate marketing and PR initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        company: "Nike",
                        title: "Sustainability Initiative 2025",
                        date: "2 days ago",
                        impact: "positive",
                      },
                      { company: "Facebook", title: "Digital Literacy Program", date: "5 days ago", impact: "neutral" },
                      {
                        company: "Nestle",
                        title: "Plastic Reduction Campaign",
                        date: "1 week ago",
                        impact: "positive",
                      },
                      {
                        company: "Amazon",
                        title: "Worker Benefits Expansion",
                        date: "2 weeks ago",
                        impact: "positive",
                      },
                    ].map((campaign) => (
                      <div key={campaign.title} className="flex items-start justify-between border-b pb-3">
                        <div>
                          <div className="font-medium">
                            {campaign.company}: {campaign.title}
                          </div>
                          <div className="text-sm text-muted-foreground">{campaign.date}</div>
                        </div>
                        <Badge
                          variant={
                            campaign.impact === "positive"
                              ? "default"
                              : campaign.impact === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {campaign.impact === "positive" ? (
                            <ThumbsUp className="mr-1 h-3 w-3" />
                          ) : campaign.impact === "negative" ? (
                            <ThumbsDown className="mr-1 h-3 w-3" />
                          ) : null}
                          {campaign.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Profiles</CardTitle>
                <CardDescription>Detailed company information and reputation history</CardDescription>
              </CardHeader>
              <CardContent>
                <CompanyProfile company={selectedCompany} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Watchlist</CardTitle>
                <CardDescription>Companies you're tracking for reputation changes</CardDescription>
              </CardHeader>
              <CardContent>
                <CompanyWatchlist />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Viral Content Archive</CardTitle>
                <CardDescription>Content that significantly impacted company reputations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  Viral content archive would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="esg" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ESG Tracking</CardTitle>
                <CardDescription>Environmental, Social, and Governance performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                  ESG tracking data would appear here
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