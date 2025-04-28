"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Bell, FileText, Home, Settings, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// interface NavProps {
//   isCollapsed?: boolean
//   links?: {
//     title: string
//     label?: string
//     icon: React.ReactNode
//     href: string
//   }[]
// }

export function DashboardNav({ isCollapsed, links }) {
  const pathname = usePathname()

  const defaultLinks = [
    {
      title: "Overview",
      label: "",
      icon: <Home className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      title: "Sentiment Analysis",
      label: "",
      icon: <BarChart3 className="h-4 w-4" />,
      href: "/dashboard/sentiment",
    },
    {
      title: "Growth Prediction",
      label: "New",
      icon: <TrendingUp className="h-4 w-4" />,
      href: "/dashboard/growth",
    },
    {
      title: "Audience Analysis",
      label: "",
      icon: <Users className="h-4 w-4" />,
      href: "/dashboard/audience",
    },
    {
      title: "Crisis Alerts",
      label: "3",
      icon: <Bell className="h-4 w-4" />,
      href: "/dashboard/alerts",
    },
    {
      title: "Reports",
      label: "",
      icon: <FileText className="h-4 w-4" />,
      href: "/dashboard/reports",
    },
    {
      title: "Settings",
      label: "",
      icon: <Settings className="h-4 w-4" />,
      href: "/dashboard/settings",
    },
  ]

  const navLinks = links || defaultLinks

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href

          return (
            <Link key={index} href={link.href} passHref>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 border border-transparent bg-transparent text-white hover:bg-white/10 hover:text-white",
                  isActive && "border-white/10 bg-white/10 font-medium",
                  isCollapsed && "h-9 w-9 justify-center p-0",
                )}
              >
                {link.icon}
                {!isCollapsed && <span className="flex-1 text-left">{link.title}</span>}
                {!isCollapsed && link.label && (
                  <span
                    className={cn(
                      "ml-auto flex h-5 items-center justify-center rounded-full px-2 text-xs font-semibold",
                      link.label === "New" ? "bg-amber-300/20 text-amber-300" : "bg-white/20",
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
