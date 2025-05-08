"use client"
import { DashboardNav } from '@/components/dashboard-nav'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function layout({children}) {
  return (
    <div className='px-5 '>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
          {/* <Shield className="h-6 w-6 text-primary" /> */}
          <Image src={'/logoipsum-custom-logo.svg'} height={'30'} width={'30'} className='cursor-pointer'/>
          <span>RepuLens</span>
        </div>
        {/* <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Solutions
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Testimonials
          </Link>
        </nav> */}
        <div className="flex items-center gap-4">
          {/* <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button> */}

          {/* <Link href="/sign-up">
            <Button variant={"outline"} className={"bg-transparent"}>
                      <AnimatedGradientText >
                    Get Started
                  </AnimatedGradientText>
                  </Button>
          </Link> */}
          <Button
  onClick={() => signOut({ callbackUrl: "/" })}
   variant="destructive"
>
  Sign Out
</Button>
        </div>
      </div>
    </header>
      {children}</div>
  )
}

export default layout