import { Badge, BarChart3, ChevronRight, Globe, TrendingUp } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { AnimatedGradientText } from './magicui/animated-gradient-text'

function Solution() {
  return (
    <section id="solutions" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className='mt-2 text-xl'>
                <Button variant={"outline"} className={"rounded-2xl bg-transparent"}>
          <AnimatedGradientText className="text-sm font-medium">
        Features
      </AnimatedGradientText>
      </Button>
      </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Reputation Intelligence
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive tools for monitoring, analyzing, and managing corporate reputation.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 py-12">
          <Card className="bg-background/60 backdrop-blur-sm hover:border-primary/40 border-border">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-4">Real-time Analytics</CardTitle>
              <CardDescription>
                Monitor sentiment across social media, news, and customer reviews in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Social media sentiment tracking</li>
                <li>News and media monitoring</li>
                <li>Customer review analysis</li>
                <li>Trend identification</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="gap-1">
                Learn more <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm hover:border-primary/40 border-border">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-4">Predictive Insights</CardTitle>
              <CardDescription>
                AI-powered predictions to help you stay ahead of reputation trends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Trend forecasting</li>
                <li>Crisis prediction</li>
                <li>Sentiment trajectory analysis</li>
                <li>Market impact assessment</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="gap-1">
                Learn more <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-background/60 backdrop-blur-sm hover:border-primary/40 border-border">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-4">Global Coverage</CardTitle>
              <CardDescription>
                Comprehensive monitoring across platforms, languages, and regions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Multi-language support</li>
                <li>Regional sentiment analysis</li>
                <li>Cultural context awareness</li>
                <li>Global trend comparison</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="gap-1">
                Learn more <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Solution
