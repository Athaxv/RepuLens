"use client"

import { useState, useEffect } from "react"
import { Search, X, Building2, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample data for controversies
const controversiesData = [
  {
    id: "c1",
    company: "Nike",
    title: "Labor Practices in Southeast Asia",
    date: "2 days ago",
    description:
      "Reports have emerged about poor working conditions in Nike's manufacturing facilities in Vietnam, with allegations of excessive overtime and inadequate compensation.",
    impact: "high",
    category: "Labor",
  },
  {
    id: "c2",
    company: "Facebook",
    title: "Data Privacy Breach Affecting Millions",
    date: "1 week ago",
    description:
      "A major data breach at Facebook has exposed personal information of millions of users, raising concerns about the company's data security practices and potential regulatory consequences.",
    impact: "high",
    category: "Privacy",
  },
  {
    id: "c3",
    company: "Nestle",
    title: "Water Extraction in Drought-Prone Regions",
    date: "3 days ago",
    description:
      "Nestle faces criticism for continuing to extract millions of gallons of water in regions experiencing severe drought conditions, despite community opposition and environmental concerns.",
    impact: "medium",
    category: "Environment",
  },
  {
    id: "c4",
    company: "Amazon",
    title: "Warehouse Working Conditions Investigation",
    date: "5 days ago",
    description:
      "An investigation into Amazon's warehouse working conditions has revealed concerns about worker safety, productivity quotas, and union-busting tactics at multiple facilities.",
    impact: "medium",
    category: "Labor",
  },
  {
    id: "c5",
    company: "Tesla",
    title: "Autopilot Safety Concerns After Accidents",
    date: "1 day ago",
    description:
      "Following several accidents involving Tesla vehicles with Autopilot engaged, regulators are investigating the safety of the driver assistance system and the company's marketing claims.",
    impact: "high",
    category: "Product Safety",
  },
  {
    id: "c6",
    company: "Apple",
    title: "Supply Chain Labor Violations",
    date: "1 week ago",
    description:
      "Reports of labor violations in Apple's supply chain factories, including excessive overtime and unsafe working conditions.",
    impact: "medium",
    category: "Labor",
  },
  {
    id: "c7",
    company: "Coca-Cola",
    title: "Plastic Pollution Concerns",
    date: "2 weeks ago",
    description:
      "Environmental groups criticize Coca-Cola for contributing to plastic pollution through single-use bottles and inadequate recycling initiatives.",
    impact: "medium",
    category: "Environment",
  },
  {
    id: "c8",
    company: "Google",
    title: "Antitrust Investigation",
    date: "3 days ago",
    description:
      "Regulatory authorities launch antitrust investigation into Google's market dominance and potential anti-competitive practices.",
    impact: "high",
    category: "Legal",
  },
]

// Sample data for companies
const companiesData = [
  { id: "1", name: "Nike", industry: "Apparel & Footwear", sentiment: 72 },
  { id: "2", name: "Apple", industry: "Technology", sentiment: 85 },
  { id: "3", name: "Facebook", industry: "Social Media", sentiment: 40 },
  { id: "4", name: "Amazon", industry: "E-commerce", sentiment: 70 },
  { id: "5", name: "Tesla", industry: "Automotive", sentiment: 68 },
  { id: "6", name: "Google", industry: "Technology", sentiment: 78 },
  { id: "7", name: "Microsoft", industry: "Technology", sentiment: 82 },
  { id: "8", name: "Coca-Cola", industry: "Beverages", sentiment: 75 },
  { id: "9", name: "Pepsi", industry: "Beverages", sentiment: 73 },
  { id: "10", name: "Nestle", industry: "Food & Beverage", sentiment: 48 },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectCompany?: (company: any) => void
  onSelectControversy?: (controversy: any) => void
}

export function SearchDialog({ open, onOpenChange, onSelectCompany, onSelectControversy }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchResults, setSearchResults] = useState({
    companies: [] as any[],
    controversies: [] as any[],
  })
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true)

      // Simulate search delay
      const timer = setTimeout(() => {
        const query = searchQuery.toLowerCase()

        // Filter companies
        const filteredCompanies = companiesData.filter(
          (company) => company.name.toLowerCase().includes(query) || company.industry.toLowerCase().includes(query),
        )

        // Filter controversies
        const filteredControversies = controversiesData.filter(
          (controversy) =>
            controversy.title.toLowerCase().includes(query) ||
            controversy.company.toLowerCase().includes(query) ||
            controversy.category.toLowerCase().includes(query) ||
            controversy.description.toLowerCase().includes(query),
        )

        setSearchResults({
          companies: filteredCompanies,
          controversies: filteredControversies,
        })
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSearchResults({ companies: [], controversies: [] })
    }
  }, [searchQuery])

  const handleSelectCompany = (company: any) => {
    if (onSelectCompany) {
      onSelectCompany(company)
    }
    onOpenChange(false)
  }

  const handleSelectControversy = (controversy: any) => {
    if (onSelectControversy) {
      onSelectControversy(controversy)
    }
    onOpenChange(false)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const totalResults = searchResults.companies.length + searchResults.controversies.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-2 relative">
          <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies, controversies, products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchQuery && (
            <Button variant="ghost" size="icon" className="absolute right-6 top-2 h-6 w-6" onClick={handleClearSearch}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {searchQuery.length > 1 && (
          <>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All
                  {totalResults > 0 && <Badge className="ml-2">{totalResults}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="companies">
                  Companies
                  {searchResults.companies.length > 0 && (
                    <Badge className="ml-2">{searchResults.companies.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="controversies">
                  Controversies
                  {searchResults.controversies.length > 0 && (
                    <Badge className="ml-2">{searchResults.controversies.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <ScrollArea className="h-[400px] px-4 py-2">
              {isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Searching...</p>
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="all" className="mt-0 space-y-4">
                    {searchResults.companies.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Companies</h3>
                        {searchResults.companies.slice(0, 3).map((company) => (
                          <CompanySearchResult
                            key={company.id}
                            company={company}
                            onClick={() => handleSelectCompany(company)}
                          />
                        ))}
                        {searchResults.companies.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setActiveTab("companies")}
                          >
                            View all {searchResults.companies.length} companies
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}

                    {searchResults.controversies.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Controversies</h3>
                        {searchResults.controversies.slice(0, 3).map((controversy) => (
                          <ControversySearchResult
                            key={controversy.id}
                            controversy={controversy}
                            onClick={() => handleSelectControversy(controversy)}
                          />
                        ))}
                        {searchResults.controversies.length > 3 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setActiveTab("controversies")}
                          >
                            View all {searchResults.controversies.length} controversies
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="companies" className="mt-0 space-y-2">
                    <h3 className="text-sm font-medium">Companies</h3>
                    {searchResults.companies.map((company) => (
                      <CompanySearchResult
                        key={company.id}
                        company={company}
                        onClick={() => handleSelectCompany(company)}
                      />
                    ))}
                  </TabsContent>

                  <TabsContent value="controversies" className="mt-0 space-y-2">
                    <h3 className="text-sm font-medium">Controversies</h3>
                    {searchResults.controversies.map((controversy) => (
                      <ControversySearchResult
                        key={controversy.id}
                        controversy={controversy}
                        onClick={() => handleSelectControversy(controversy)}
                      />
                    ))}
                  </TabsContent>
                </>
              )}
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function CompanySearchResult({ company, onClick }: { company: any; onClick: () => void }) {
  return (
    <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted text-left" onClick={onClick}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        <Building2 className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{company.name}</div>
        <div className="text-xs text-muted-foreground truncate">{company.industry}</div>
      </div>
      <Badge
        variant={company.sentiment > 70 ? "default" : company.sentiment > 50 ? "secondary" : "destructive"}
        className="ml-auto"
      >
        {company.sentiment}%
      </Badge>
    </button>
  )
}

function ControversySearchResult({ controversy, onClick }: { controversy: any; onClick: () => void }) {
  return (
    <button className="w-full flex items-start gap-3 p-2 rounded-md hover:bg-muted text-left" onClick={onClick}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted mt-0.5">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{controversy.title}</div>
        <div className="text-xs text-muted-foreground truncate">
          {controversy.company} • {controversy.date}
        </div>
        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{controversy.description}</div>
      </div>
      <Badge
        variant={
          controversy.impact === "high" ? "destructive" : controversy.impact === "medium" ? "warning" : "default"
        }
        className={cn("ml-auto shrink-0", controversy.impact === "warning" && "bg-amber-500")}
      >
        {controversy.impact}
      </Badge>
    </button>
  )
}
