import { Badge, Star } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { AnimatedGradientText } from './magicui/animated-gradient-text'
import { Button } from './ui/button'

function Feature() {
  return (
    <>
    <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Companies Worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses and consumers who rely on RepuLens for reputation intelligence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12 py-12">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm font-medium text-muted-foreground">Enterprise Clients</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">10M+</div>
                <div className="text-sm font-medium text-muted-foreground">Data Points Daily</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-sm font-medium text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-sm font-medium text-muted-foreground">Real-time Monitoring</div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
            <div className='mt-2 text-xl'>
                <Button variant={"outline"} className={"rounded-2xl bg-transparent"}>
          <AnimatedGradientText className="text-sm font-medium">
        Testimonials
      </AnimatedGradientText>
      </Button>
      </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from businesses and consumers who use RepuLens to make informed decisions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 py-12">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm italic">
                  "RepuLens has transformed how we monitor our brand reputation. The real-time alerts have helped us
                  address potential issues before they escalate."
                </blockquote>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">PR Director, Global Retail Corp</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm italic">
                  "As a consumer, I appreciate the transparency RepuLens provides. It helps me make more informed
                  decisions about which companies I support with my purchases."
                </blockquote>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">Conscious Consumer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm italic">
                  "The competitor benchmarking feature has been invaluable for our strategy. We can now see exactly
                  where we stand in our industry and where we need to improve."
                </blockquote>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">David Rodriguez</p>
                    <p className="text-xs text-muted-foreground">CMO, Tech Innovations Inc</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      </>
  )
}

export default Feature