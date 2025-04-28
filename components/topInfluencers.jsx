"use client"

export function topInfluencers() {
  const influencers = [
    {
      name: "Sarah Johnson",
      handle: "@techsarah",
      impact: 92,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Tech Review Pro",
      handle: "@techreviewpro",
      impact: 87,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "David Chen",
      handle: "@davidtechguru",
      impact: 85,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Future Insights",
      handle: "@futureinsights",
      impact: 82,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Maria Garcia",
      handle: "@mariareviews",
      impact: 78,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      {influencers.map((influencer, index) => (
        <div key={index} className="flex items-center gap-4">
          <img
            src={influencer.image || "/placeholder.svg"}
            alt={influencer.name}
            className="h-10 w-10 rounded-full bg-muted"
          />
          <div>
            <h4 className="text-sm font-medium">{influencer.name}</h4>
            <p className="text-xs text-muted-foreground">{influencer.handle}</p>
          </div>
          <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xs font-medium">{influencer.impact}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
