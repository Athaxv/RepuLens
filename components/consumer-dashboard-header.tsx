"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConsumerDashboardHeader() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Consumer Dashboard</h1>
        <Button>
          Add to Watchlist
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <p className="text-muted-foreground">
        Track corporate reputation, controversies, and ethical performance across companies.
      </p>
    </div>
  )
}
