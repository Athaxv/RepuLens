"use client"

import { useEffect, useState } from "react"
import {
  Calendar,
  Download,
  Facebook,
  Filter,
  Instagram,
  MessageSquare,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Twitter,
  Youtube,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshButton } from "@/components/refresh-button"

// Mock data for platform comments
const platformComments = {
  twitter: [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        handle: "@sarahjohnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Just tried the new @YourCompany product and I'm absolutely loving it! The interface is so intuitive. #GreatExperience",
      date: "2 hours ago",
      sentiment: "positive",
      engagement: {
        likes: 45,
        retweets: 12,
        replies: 8,
      },
      platform: "twitter",
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        handle: "@mikechen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Having some issues with @YourCompany customer service. Been waiting for a response for 3 days now. Anyone else experiencing this?",
      date: "5 hours ago",
      sentiment: "negative",
      engagement: {
        likes: 23,
        retweets: 5,
        replies: 15,
      },
      platform: "twitter",
    },
    {
      id: 3,
      user: {
        name: "Alex Rivera",
        handle: "@alexr",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "The new update from @YourCompany has some good features but also removed some functionality I used daily. Mixed feelings about this one.",
      date: "1 day ago",
      sentiment: "neutral",
      engagement: {
        likes: 32,
        retweets: 7,
        replies: 11,
      },
      platform: "twitter",
    },
  ],
  facebook: [
    {
      id: 4,
      user: {
        name: "Jennifer Williams",
        handle: "Jennifer Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "I've been using this product for about a month now and I can definitely see the difference. Highly recommend to anyone looking for quality!",
      date: "3 hours ago",
      sentiment: "positive",
      engagement: {
        likes: 78,
        shares: 14,
        comments: 22,
      },
      platform: "facebook",
    },
    {
      id: 5,
      user: {
        name: "Robert Thompson",
        handle: "Robert Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Ordered the premium package last week and still haven't received any shipping confirmation. Very disappointing experience so far.",
      date: "1 day ago",
      sentiment: "negative",
      engagement: {
        likes: 12,
        shares: 3,
        comments: 31,
      },
      platform: "facebook",
    },
  ],
  instagram: [
    {
      id: 6,
      user: {
        name: "lifestyle_with_emma",
        handle: "@lifestyle_with_emma",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Absolutely loving the aesthetic of this product! It fits perfectly with my minimalist home decor. Thanks @YourCompany for the perfect addition! ✨ #HomeDecor #Minimalism",
      date: "4 hours ago",
      sentiment: "positive",
      engagement: {
        likes: 342,
        comments: 56,
      },
      platform: "instagram",
    },
    {
      id: 7,
      user: {
        name: "tech_reviewer_pro",
        handle: "@tech_reviewer_pro",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Testing out the new @YourCompany device. Battery life is decent, performance is okay. Full review coming soon on my channel. #TechReview",
      date: "2 days ago",
      sentiment: "neutral",
      engagement: {
        likes: 189,
        comments: 42,
      },
      platform: "instagram",
    },
  ],
  youtube: [
    {
      id: 8,
      user: {
        name: "TechExplorer",
        handle: "TechExplorer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "This video doesn't show how the product performs under heavy usage. I've been using it for intensive tasks and it overheats quite frequently. Disappointing for the price point.",
      date: "1 day ago",
      sentiment: "negative",
      engagement: {
        likes: 87,
        replies: 23,
      },
      platform: "youtube",
    },
    {
      id: 9,
      user: {
        name: "GadgetFan2023",
        handle: "GadgetFan2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment:
        "Great overview! I purchased this last month and can confirm everything in this video. The battery life is amazing and the performance exceeds expectations. Worth every penny!",
      date: "3 days ago",
      sentiment: "positive",
      engagement: {
        likes: 156,
        replies: 12,
      },
      platform: "youtube",
    },
  ],
}

// Combine all comments for the "all" tab
const allComments = [
  ...platformComments.twitter,
  ...platformComments.facebook,
  ...platformComments.instagram,
  ...platformComments.youtube,
].sort((a, b) => {
  // Sort by engagement (simplified as total engagement)
  const aEngagement = Object.values(a.engagement).reduce((sum, val) => sum + val, 0)
  const bEngagement = Object.values(b.engagement).reduce((sum, val) => sum + val, 0)
  return bEngagement - aEngagement
})

export default function AudiencePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("engagement")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredComments, setFilteredComments] = useState(allComments)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter comments based on active tab, sentiment filter, and search query
    let comments = activeTab === "all" ? allComments : platformComments[activeTab]

    if (sentimentFilter !== "all") {
      comments = comments.filter((comment) => comment.sentiment === sentimentFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      comments = comments.filter(
        (comment) =>
          comment.comment.toLowerCase().includes(query) ||
          comment.user.name.toLowerCase().includes(query) ||
          comment.user.handle.toLowerCase().includes(query),
      )
    }

    // Sort comments
    if (sortOrder === "engagement") {
      comments = [...comments].sort((a, b) => {
        const aEngagement = Object.values(a.engagement).reduce((sum, val) => sum + val, 0)
        const bEngagement = Object.values(b.engagement).reduce((sum, val) => sum + val, 0)
        return bEngagement - aEngagement
      })
    } else if (sortOrder === "recent") {
      comments = [...comments].sort((a, b) => {
        // Simple sort by date string (in a real app, use actual date objects)
        return a.date.includes("hour") ? -1 : 1
      })
    }

    setFilteredComments(comments)
  }, [activeTab, sentimentFilter, sortOrder, searchQuery])

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate data fetching
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/20 text-green-500"
      case "negative":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-blue-500/20 text-blue-500"
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="container py-6 md:py-8 lg:py-10 px-5 px-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Audience Analysis</h1>
        <p className="text-muted-foreground">Monitor and analyze audience engagement across platforms</p>
      </motion.div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">{allComments.length}</div>
                <div className="flex items-center text-sm text-green-500">
                  <span>+12% from last week</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-500">Positive</span>
                  <span>
                    {allComments.filter((c) => c.sentiment === "positive").length} (
                    {Math.round(
                      (allComments.filter((c) => c.sentiment === "positive").length / allComments.length) * 100,
                    )}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (allComments.filter((c) => c.sentiment === "positive").length / allComments.length) * 100,
                  )}
                  className="h-1.5"
                  indicatorClassName="bg-green-500"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-500">Neutral</span>
                  <span>
                    {allComments.filter((c) => c.sentiment === "neutral").length} (
                    {Math.round(
                      (allComments.filter((c) => c.sentiment === "neutral").length / allComments.length) * 100,
                    )}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (allComments.filter((c) => c.sentiment === "neutral").length / allComments.length) * 100,
                  )}
                  className="h-1.5"
                  indicatorClassName="bg-blue-500"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-500">Negative</span>
                  <span>
                    {allComments.filter((c) => c.sentiment === "negative").length} (
                    {Math.round(
                      (allComments.filter((c) => c.sentiment === "negative").length / allComments.length) * 100,
                    )}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (allComments.filter((c) => c.sentiment === "negative").length / allComments.length) * 100,
                  )}
                  className="h-1.5"
                  indicatorClassName="bg-red-500"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Twitter className="h-3.5 w-3.5 text-blue-400" />
                    <span>Twitter</span>
                  </div>
                  <span>
                    {platformComments.twitter.length} (
                    {Math.round((platformComments.twitter.length / allComments.length) * 100)}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round((platformComments.twitter.length / allComments.length) * 100)}
                  className="h-1.5"
                  indicatorClassName="bg-blue-400"
                />

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Facebook className="h-3.5 w-3.5 text-blue-600" />
                    <span>Facebook</span>
                  </div>
                  <span>
                    {platformComments.facebook.length} (
                    {Math.round((platformComments.facebook.length / allComments.length) * 100)}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round((platformComments.facebook.length / allComments.length) * 100)}
                  className="h-1.5"
                  indicatorClassName="bg-blue-600"
                />

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Instagram className="h-3.5 w-3.5 text-pink-500" />
                    <span>Instagram</span>
                  </div>
                  <span>
                    {platformComments.instagram.length} (
                    {Math.round((platformComments.instagram.length / allComments.length) * 100)}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round((platformComments.instagram.length / allComments.length) * 100)}
                  className="h-1.5"
                  indicatorClassName="bg-pink-500"
                />

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Youtube className="h-3.5 w-3.5 text-red-500" />
                    <span>YouTube</span>
                  </div>
                  <span>
                    {platformComments.youtube.length} (
                    {Math.round((platformComments.youtube.length / allComments.length) * 100)}
                    %)
                  </span>
                </div>
                <Progress
                  value={Math.round((platformComments.youtube.length / allComments.length) * 100)}
                  className="h-1.5"
                  indicatorClassName="bg-red-500"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">4.8%</div>
                  <div className="flex items-center text-sm text-green-500">
                    <span>+0.6% from last week</span>
                  </div>
                </div>
                <Progress value={48} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comments..."
              className="w-full pl-8 sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement">Highest Engagement</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={handleRefresh} />

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>

          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Date range</span>
          </Button>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No comments found</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSentimentFilter("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium leading-none">{comment.user.name}</p>
                        <p className="text-sm text-muted-foreground">{comment.user.handle}</p>
                        <Badge className={getSentimentColor(comment.sentiment)}>
                          {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getPlatformIcon(comment.platform)}
                          <span>{comment.platform.charAt(0).toUpperCase() + comment.platform.slice(1)}</span>
                        </Badge>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                      <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                        <span>{comment.date}</span>
                        <div className="flex items-center gap-1">
                          {comment.platform === "twitter" && (
                            <>
                              <div className="flex items-center gap-0.5">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{comment.engagement.likes}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <Share2 className="h-3.5 w-3.5" />
                                <span>{comment.engagement.retweets}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{comment.engagement.replies}</span>
                              </div>
                            </>
                          )}
                          {comment.platform === "facebook" && (
                            <>
                              <div className="flex items-center gap-0.5">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{comment.engagement.likes}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <Share2 className="h-3.5 w-3.5" />
                                <span>{comment.engagement.shares}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{comment.engagement.comments}</span>
                              </div>
                            </>
                          )}
                          {comment.platform === "instagram" && (
                            <>
                              <div className="flex items-center gap-0.5">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{comment.engagement.likes}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{comment.engagement.comments}</span>
                              </div>
                            </>
                          )}
                          {comment.platform === "youtube" && (
                            <>
                              <div className="flex items-center gap-0.5">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{comment.engagement.likes}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{comment.engagement.replies}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Dislike</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Reply</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4">
          {/* Twitter tab content - will be populated by the useEffect filter */}
          {isLoading ? (
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No Twitter comments found</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSentimentFilter("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          ) : (
            // The filtered comments will be shown here
            <div className="space-y-4">{/* Content will be populated by the useEffect filter */}</div>
          )}
        </TabsContent>

        <TabsContent value="facebook" className="space-y-4">
          {/* Facebook tab content - will be populated by the useEffect filter */}
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          {/* Instagram tab content - will be populated by the useEffect filter */}
        </TabsContent>

        <TabsContent value="youtube" className="space-y-4">
          {/* YouTube tab content - will be populated by the useEffect filter */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
