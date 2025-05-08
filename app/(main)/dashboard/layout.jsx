"use client"
import { AIAssistant } from '@/components/ai-assistant'
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true)
      const [mounted, setMounted] = useState(false)
      const [userName, setUserName] = useState("Sarah Johnson")
      const [userType, setUserType] = useState("business")
    
      useEffect(() => {
        setMounted(true)
        // Simulate loading
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 1500)
    
        return () => clearTimeout(timer)
      }, [])
    
      if (!mounted) return null
    
    //   const handleRefresh = async () => {
    //     setIsLoading(true)
    //     // Simulate data fetching
    //     await new Promise((resolve) => setTimeout(resolve, 1500))
    //     setIsLoading(false)
    //   }
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/10 bg-black/80 px-4 backdrop-blur-md md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-white/10 bg-black/95 text-white backdrop-blur-md">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Sparkles className="h-6 w-6 text-amber-300" />
                <span>Repulens</span>
              </Link>
              <DashboardNav userType={userType} />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-6 w-6 text-amber-300" />
            <span className="hidden md:inline-block">Repulens</span>
          </Link>
        </div>
        <div className="flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="w-full appearance-none border-white/10 bg-white/5 pl-8 text-white placeholder:text-white/50 focus:border-amber-300/50 focus:ring-amber-300/50 md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          {/* AI Assistant Button */}
          <AIAssistant />

          <Button
            variant="outline"
            size="icon"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-amber-300"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {userName}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white/10 bg-black/95 text-white backdrop-blur-md">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-white/10 bg-black/50 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                <DashboardNav userType={userType} />
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gradient-to-b from-black to-black/90">
          {children}
        </main>
      </div>
    </div>
  )
}


export default Layout