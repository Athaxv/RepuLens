import { ArrowRight, Building2, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function Preview() {
  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Reputation Management?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses and consumers who rely on RepuLens for reputation intelligence.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login?type=business">
                  <Button size="lg" variant="secondary" className="gap-1">
                    <Building2 className="h-4 w-4" />
                    For Businesses
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login?type=consumer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <User className="h-4 w-4" />
                    For Consumers
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Preview