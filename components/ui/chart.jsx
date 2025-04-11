import React from "react"
import { Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/lib/utils"

function ChartTooltipContent({ className, ...props }) {
  return (
    <div className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-sm", className)} {...props} />
  )
}

function ChartTooltipHeader({ className, ...props }) {
  return (
    <div className={cn("font-bold", className)} {...props} />
  )
}

function ChartTooltipItem({ className, label, color, children, ...props }) {
  return (
    <div className={cn("grid grid-cols-[100px_1fr] items-center gap-x-2 text-sm", className)} {...props}>
      {label && <span className="text-muted-foreground">{label}</span>}
      <span className="font-medium">{children}</span>
    </div>
  )
}

function ChartTooltip(props) {
  return <RechartsTooltip {...props} />
}

function Chart({ className, ...props }) {
  return (
    <div className={cn("h-full w-full", className)} {...props} />
  )
}

export {
  Chart,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipHeader,
  ChartTooltipItem
}
