"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Twitter, Globe, Facebook } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// interface CompanyTopCommentsProps {
//   isLoading?: boolean
// }

// Mock data for comments
const comments = {
  positive: [
    {
      id: "1",
      author: "Sarah Johnson",
      handle: "@techsarah",
      platform: "twitter",
      date: "2 days ago",
      content:
        "The customer service at TechVision is exceptional! They resolved my issue within minutes and followed up to make sure everything was working properly.",
      sentiment: 92,
      likes: 124,
      replies: 18,
    },
    {
      id: "2",
      author: "David Chen",
      handle: "@davidtechguru",
      platform: "twitter",
      date: "1 week ago",
      content:
        "Just upgraded to the latest TechVision product and I'm blown away by the quality and performance improvements. Definitely worth every penny!",
      sentiment: 95,
      likes: 87,
      replies: 12,
    },
    {
      id: "3",
      author: "Emily Rodriguez",
      handle: "Emily R.",
      platform: "facebook",
      date: "3 days ago",
      content:
        "I've been using TechVision products for years and they just keep getting better. The new interface is intuitive and the performance is outstanding.",
      sentiment: 88,
      likes: 56,
      replies: 7,
    },
    {
      id: "4",
      author: "Tech Review Pro",
      handle: "Tech Review",
      platform: "web",
      date: "2 weeks ago",
      content:
        "In our latest review, TechVision's new product line stands out for its innovative features and attention to user experience. A clear leader in the industry.",
      sentiment: 90,
      likes: 215,
      replies: 32,
    },
  ],
  neutral: [
    {
      id: "5",
      author: "Michael Thompson",
      handle: "@mike_tech",
      platform: "twitter",
      date: "5 days ago",
      content:
        "TechVision's new product has some interesting features, but I'm not sure if it's worth upgrading from last year's model. Waiting for more reviews.",
      sentiment: 50,
      likes: 42,
      replies: 15,
    },
    {
      id: "6",
      author: "Tech Insider",
      handle: "Tech Insider",
      platform: "web",
      date: "1 week ago",
      content:
        "TechVision's quarterly results show steady growth, though market competition remains fierce. The company faces challenges in emerging markets.",
      sentiment: 55,
      likes: 78,
      replies: 23,
    },
  ],
  negative: [
    {
      id: "7",
      author: "James Wilson",
      handle: "@jwilson",
      platform: "twitter",
      date: "3 days ago",
      content:
        "Disappointed with TechVision's latest update. It's buggy and crashes constantly. Customer service took 3 days to respond to my support ticket. Not acceptable for a premium product.",
      sentiment: 25,
      likes: 63,
      replies: 28,
    },
    {
      id: "8",
      author: "Consumer Reports",
      handle: "Consumer Reports",
      platform: "web",
      date: "2 weeks ago",
      content:
        "Our testing revealed significant battery life issues with TechVision's newest devices. While the features are impressive, the poor battery performance is a major drawback.",
      sentiment: 30,
      likes: 142,
      replies: 47,
    },
  ],
}

export function CompanyTopComments({ isLoading = false }) {
  const [sortBy, setSortBy] = useState("recent")

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Comments</CardTitle>
          <CardDescription>What people are saying about this company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-10 w-[150px]" />
          </div>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderCommentIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-[#4267B2]" />
      default:
        return <Globe className="h-4 w-4 text-muted-foreground" />
    }
  }

  const renderSentimentBadge = (sentiment) => {
    if (sentiment >= 70) {
      return <Badge variant="success">{sentiment}% Positive</Badge>
    } else if (sentiment >= 40) {
      return <Badge variant="warning">{sentiment}% Neutral</Badge>
    } else {
      return <Badge variant="destructive">{sentiment}% Negative</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Comments</CardTitle>
        <CardDescription>What people are saying about this company</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="relevant">Most Relevant</SelectItem>
              <SelectItem value="engagement">Highest Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {[...comments.positive, ...comments.neutral, ...comments.negative].slice(0, 5).map((comment) => (
              <div key={comment.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {renderCommentIcon(comment.platform)}
                        <span>{comment.handle}</span>
                        <span>•</span>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  </div>
                  {renderSentimentBadge(comment.sentiment)}
                </div>
                <p className="mb-3 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{comment.replies}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Load More Comments
            </Button>
          </TabsContent>

          <TabsContent value="positive" className="space-y-4">
            {comments.positive.map((comment) => (
              <div key={comment.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {renderCommentIcon(comment.platform)}
                        <span>{comment.handle}</span>
                        <span>•</span>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">{comment.sentiment}% Positive</Badge>
                </div>
                <p className="mb-3 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{comment.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="neutral" className="space-y-4">
            {comments.neutral.map((comment) => (
              <div key={comment.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {renderCommentIcon(comment.platform)}
                        <span>{comment.handle}</span>
                        <span>•</span>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="warning">{comment.sentiment}% Neutral</Badge>
                </div>
                <p className="mb-3 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{comment.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="negative" className="space-y-4">
            {comments.negative.map((comment) => (
              <div key={comment.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {renderCommentIcon(comment.platform)}
                        <span>{comment.handle}</span>
                        <span>•</span>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="destructive">{comment.sentiment}% Negative</Badge>
                </div>
                <p className="mb-3 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{comment.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
