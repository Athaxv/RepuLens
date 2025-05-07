"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// interface RefreshButtonProps {
//   onRefresh?: () => Promise<void>
//   label?: string
//   className?: string
//   variant?: "default" | "outline" | "ghost"
//   size?: "default" | "sm" | "lg" | "icon"
// }

export function RefreshButton({
  onRefresh,
  label = "Refresh data",
  className,
  variant = "outline",
  size = "icon",
}) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      if (onRefresh) {
        await onRefresh()
      } else {
        // Default refresh behavior - wait for 1 second to simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      toast({
        title: "Data refreshed",
        description: "Your dashboard data has been updated successfully.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Refresh failed",
        description: "There was a problem updating your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-label={label}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {size !== "icon" && <span className="ml-2">{label}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isRefreshing ? "Refreshing..." : label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
