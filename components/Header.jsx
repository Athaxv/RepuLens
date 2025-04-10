"use client"
import { Moon, Shield, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'

function Header() {
    const {theme, setTheme} = useTheme();
  return (
    <div className='pl-2 pr-2'>
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>RepuLens</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
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
          </nav>
          <div className="flex items-center gap-4">
            {/* <Link href="/login?type=business">
              <Button variant="ghost">Business Login</Button>
            </Link> */}
            {/* <Link href="/login?type=consumer">
              <Button variant="ghost">Consumer Login</Button>
            </Link> */}
            <Button variant={"outline"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {
                    theme === "dark" ? (
                        <Sun></Sun>
                    ) : (
                        <Moon></Moon>
                    )
                }
            </Button>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      </div>
  )
}

export default Header