"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// interface Message {
//   id: string
//   content: string
//   role: "user" | "assistant"
//   timestamp: Date
// }

// This is the button component that can be used in the navigation
export function AIAssistantButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-white hover:bg-white/10 hover:text-white"
              >
                <Bot className="h-4 w-4" />
                <span className="flex-1 text-left">AI Assistant</span>
                <span className="ml-auto flex h-5 items-center justify-center rounded-full px-2 text-xs font-semibold bg-amber-300/20 text-amber-300">
                  New
                </span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AIAssistantDialog />
    </Dialog>
  )
}

// This is the main component that can be used in the header
export function AIAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white relative"
              >
                <Bot className="h-5 w-5" />
                <span className="sr-only">AI Assistant</span>
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AIAssistantDialog />
    </Dialog>
  )
}

// Shared dialog component used by both AIAssistant and AIAssistantButton
function AIAssistantDialog() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI assistant. I can help you understand your sentiment data and improve your brand reputation. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isThinking, setIsThinking] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isThinking) return

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your sentiment analysis, I recommend focusing on improving customer service mentions which have shown a 12% decrease in positive sentiment over the last month.",
        "Your brand's sentiment score has improved by 8% since implementing your last campaign. The keywords 'reliable' and 'innovative' are now more frequently associated with your brand.",
        "I've analyzed your competitors' sentiment trends. Your main competitor has seen a 5% drop in positive sentiment, creating an opportunity for your brand to gain market share.",
        "Your crisis response effectiveness score is 82/100, which is above industry average. The quick response time to negative mentions has helped maintain your overall reputation.",
        "Looking at your sentiment data across different demographics, you're performing well with ages 25-34 but could improve with the 45+ segment where sentiment is 15% lower.",
      ]

      const aiMessage = {
        id: `assistant-${Date.now()}`,
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsThinking(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <DialogContent className="sm:max-w-[500px] md:max-w-[600px] max-h-[80vh] flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>AI Assistant</span>
        </DialogTitle>
        <DialogDescription>Get insights and recommendations based on your sentiment data</DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto py-4 pr-1 max-h-[400px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {message.content}
            </div>
          ))}
          {isThinking && (
            <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="flex items-center border-t pt-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your sentiment data..."
            className="flex-1"
            disabled={isThinking}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isThinking}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}
