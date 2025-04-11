"use client"

import { useState } from "react"
import { BookmarkCheck, BookmarkPlus, Eye, EyeOff, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Sample watchlist data
const sampleWatchlist = [
  {
    id: "1",
    name: "Nike",
    industry: "Apparel & Footwear",
    sentiment: 72,
    sentimentChange: "+2.5%",
    notifications: true,
    starred: true,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Apple",
    industry: "Technology",
    sentiment: 85,
    sentimentChange: "+1.2%",
    notifications: true,
    starred: false,
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Tesla",
    industry: "Automotive",
    sentiment: 68,
    sentimentChange: "-3.1%",
    notifications: false,
    starred: false,
    lastUpdated: "5 hours ago",
  },
  {
    id: "4",
    name: "Amazon",
    industry: "E-commerce",
    sentiment: 70,
    sentimentChange: "+0.8%",
    notifications: true,
    starred: true,
    lastUpdated: "3 hours ago",
  },
  {
    id: "5",
    name: "Coca-Cola",
    industry: "Beverages",
    sentiment: 75,
    sentimentChange: "+1.5%",
    notifications: false,
    starred: false,
    lastUpdated: "1 day ago",
  },
]

// Companies that can be added to watchlist
const availableCompanies = [
  { id: "6", name: "Microsoft", industry: "Technology" },
  { id: "7", name: "Google", industry: "Technology" },
  { id: "8", name: "Facebook", industry: "Social Media" },
  { id: "9", name: "Nestle", industry: "Food & Beverage" },
  { id: "10", name: "Adidas", industry: "Apparel & Footwear" },
  { id: "11", name: "Pepsi", industry: "Beverages" },
  { id: "12", name: "Samsung", industry: "Technology" },
]

export function CompanyWatchlist() {
  const [watchlist, setWatchlist] = useState(sampleWatchlist)
  const [showHidden, setShowHidden] = useState(false)

  const handleToggleNotifications = (id: string) => {
    setWatchlist(
      watchlist.map((company) => (company.id === id ? { ...company, notifications: !company.notifications } : company)),
    )
    toast({
      title: "Notifications updated",
      description: `Notifications ${
        watchlist.find((c) => c.id === id)?.notifications ? "disabled" : "enabled"
      } for ${watchlist.find((c) => c.id === id)?.name}`,
    })
  }

  const handleToggleStar = (id: string) => {
    setWatchlist(watchlist.map((company) => (company.id === id ? { ...company, starred: !company.starred } : company)))
  }

  const handleRemoveFromWatchlist = (id: string) => {
    const companyName = watchlist.find((c) => c.id === id)?.name
    setWatchlist(watchlist.filter((company) => company.id !== id))
    toast({
      title: "Company removed",
      description: `${companyName} has been removed from your watchlist`,
    })
  }

  const handleAddToWatchlist = (company: { id: string; name: string; industry: string }) => {
    const newCompany = {
      ...company,
      sentiment: Math.floor(Math.random() * 30) + 60, // Random sentiment between 60-90
      sentimentChange: `+${(Math.random() * 3).toFixed(1)}%`,
      notifications: true,
      starred: false,
      lastUpdated: "Just now",
    }
    setWatchlist([...watchlist, newCompany])
    toast({
      title: "Company added",
      description: `${company.name} has been added to your watchlist`,
    })
  }

  const visibleWatchlist = showHidden ? watchlist : watchlist.filter((company) => !company.hidden)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="current">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="current">My Watchlist</TabsTrigger>
            <TabsTrigger value="add">Add Companies</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowHidden(!showHidden)}>
              {showHidden ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showHidden ? "Hide Archived" : "Show Archived"}
            </Button>
          </div>
        </div>

        <TabsContent value="current" className="mt-0">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {visibleWatchlist.map((company) => (
                <Card key={company.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleToggleStar(company.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${company.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </Button>
                        <div>
                          <CardTitle className="text-base">{company.name}</CardTitle>
                          <CardDescription>{company.industry}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={company.sentimentChange.startsWith("+") ? "default" : "destructive"}
                        className="ml-auto"
                      >
                        {company.sentimentChange}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sentiment Score</span>
                        <span className="font-medium">{company.sentiment}%</span>
                      </div>
                      <Progress
                        value={company.sentiment}
                        className="h-2"
                        indicatorClassName={
                          company.sentiment > 70
                            ? "bg-green-500"
                            : company.sentiment > 50
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last updated: {company.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`notifications-${company.id}`}
                        checked={company.notifications}
                        onCheckedChange={() => handleToggleNotifications(company.id)}
                      />
                      <Label htmlFor={`notifications-${company.id}`} className="text-xs">
                        Notifications
                      </Label>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRemoveFromWatchlist(company.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove from watchlist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="add" className="mt-0">
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCompanies.map((company) => (
                <Card key={company.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAddToWatchlist(company)}
                      disabled={watchlist.some((c) => c.id === company.id)}
                    >
                      {watchlist.some((c) => c.id === company.id) ? (
                        <>
                          <BookmarkCheck className="mr-2 h-4 w-4" />
                          Added to Watchlist
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="mr-2 h-4 w-4" />
                          Add to Watchlist
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
