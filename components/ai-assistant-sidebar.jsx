"use client"

import { useState } from "react"
import {
  BarChart3,
  BrainCircuit,
  ChevronRight,
  LineChart,
  MessageSquare,
  Send,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// interface AIAssistantSidebarProps {
//   onClose: () => void
// }

export function AIAssistantSidebar({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. How can I help you with sentiment analysis or brand reputation management today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've analyzed your question about "${inputValue}". Based on our sentiment data, I recommend focusing on improving customer service response times, which have been mentioned in 37% of negative feedback this month.`,
        },
      ])
    }, 1000)

    setInputValue("")
  }

  return (
    <Tabs defaultValue="chat" className="flex h-full flex-col">
      <TabsList className="grid w-full grid-cols-3 bg-black/50 p-1">
        <TabsTrigger value="chat" className="data-[state=active]:bg-white/10">
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat
        </TabsTrigger>
        <TabsTrigger value="insights" className="data-[state=active]:bg-white/10">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Insights
        </TabsTrigger>
        <TabsTrigger value="tools" className="data-[state=active]:bg-white/10">
          <Zap className="mr-2 h-4 w-4" />
          Tools
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chat" className="flex-1 overflow-hidden p-0">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-amber-500 text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about sentiment analysis, brand reputation..."
                className="border-white/10 bg-white/5 text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button size="icon" onClick={handleSendMessage} className="bg-amber-500 text-black hover:bg-amber-600">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-auto border-white/10 bg-white/5 py-1 text-xs text-white/70"
                onClick={() => setInputValue("Analyze sentiment trends for our latest product launch")}
              >
                Analyze sentiment trends
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto border-white/10 bg-white/5 py-1 text-xs text-white/70"
                onClick={() => setInputValue("How can we improve our brand reputation?")}
              >
                Improve brand reputation
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto border-white/10 bg-white/5 py-1 text-xs text-white/70"
                onClick={() => setInputValue("Identify potential crisis triggers")}
              >
                Identify crisis triggers
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="insights" className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Sentiment Analysis</CardTitle>
                <Badge className="bg-amber-500/20 text-amber-500">Updated 2h ago</Badge>
              </div>
              <CardDescription>AI-powered insights from your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <h3 className="font-medium">Key Insight</h3>
                  </div>
                  <p className="text-sm text-white/70">
                    Positive sentiment has increased 12% this week, primarily driven by positive reactions to your
                    recent product update announcement.
                  </p>
                </div>

                <div className="rounded-lg bg-white/10 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Opportunity</h3>
                  </div>
                  <p className="text-sm text-white/70">
                    Customer service response time is mentioned in 37% of negative feedback. Improving this could
                    significantly boost overall sentiment.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full border-white/10 bg-white/5">
                View Detailed Analysis
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Competitor Comparison</CardTitle>
                <Badge className="bg-blue-500/20 text-blue-500">AI Generated</Badge>
              </div>
              <CardDescription>How your brand compares to competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Your Brand</span>
                  </div>
                  <span className="font-medium">72%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Competitor A</span>
                  </div>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Competitor B</span>
                  </div>
                  <span className="font-medium">64%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Industry Average</span>
                  </div>
                  <span className="font-medium">61%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full border-white/10 bg-white/5">
                View Full Comparison
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tools" className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <LineChart className="h-4 w-4 text-amber-400" />
                  Sentiment Predictor
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Predict how changes might impact your brand sentiment
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-amber-500 text-black hover:bg-amber-600">
                  Launch Tool
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4 text-amber-400" />
                  Crisis Simulator
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Simulate crisis scenarios and test response strategies
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full bg-amber-500 text-black hover:bg-amber-600">
                  Launch Tool
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">AI Response Generator</CardTitle>
              <CardDescription>Create AI-optimized responses to customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 p-3">
                  <h4 className="mb-1 text-sm font-medium">Negative Review Response</h4>
                  <p className="text-xs text-white/70">
                    Generate empathetic, solution-focused responses to negative customer reviews
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 h-auto p-0 text-amber-400"
                    onClick={() => {
                      setInputValue(
                        "Generate a response to this negative review: The customer service was slow and the product didn't meet my expectations.",
                      )
                      onClose()
                    }}
                  >
                    Try Now <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="rounded-lg bg-white/10 p-3">
                  <h4 className="mb-1 text-sm font-medium">Crisis Communication</h4>
                  <p className="text-xs text-white/70">
                    Draft transparent, accountable communications for crisis situations
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 h-auto p-0 text-amber-400"
                    onClick={() => {
                      setInputValue(
                        "Help me draft a crisis communication about a service outage that affected 15% of our customers.",
                      )
                      onClose()
                    }}
                  >
                    Try Now <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
