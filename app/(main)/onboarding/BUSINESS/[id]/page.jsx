"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Building2, Check, ChevronRight, Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { BackgroundEffect } from "@/components/background-effect"

export default function BusinessOnboardingPage() {
  const params = useParams()
  const userId = params.id
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    revenueRange: "",
    employeeCount: "",
    website: "",
    twitter: "",
    linkedin: "",
    facebook: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // const resp = await fetch('https://brand-analysis-8jn8.onrender.com/dashboard');
      // const json = await resp.json();
      // console.log(json)
      const res = await fetch('/api/dashboard');
      const resp = await res.json();
      console.log(resp);

      console.log(formData)
      const response = await fetch(`/api/onboarding/business/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // from useParams
          ...formData,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to submit form")
      }
  
      const data = await response.json()
      console.log("Submission successful:", data)
  
      // Navigate to dashboard or success page
      router.push("/dashboard")
    } catch (error) {
      console.error("Submission error:", error)
      // Optionally show an error toast here
    } finally {
      setIsLoading(false)
    }
  }
  

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Entertainment",
    "Food & Beverage",
    "Travel",
    "Other",
  ]

  const revenueRanges = [
    "Less than $100K",
    "$100K - $500K",
    "$500K - $1M",
    "$1M - $5M",
    "$5M - $10M",
    "$10M - $50M",
    "$50M - $100M",
    "$100M+",
  ]

  const employeeRanges = ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,001-5,000", "5,001-10,000", "10,000+"]

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* <BackgroundEffect /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl space-y-8 rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-md"
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 blur-sm"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Set up your business profile</h1>
          <p className="text-sm text-white/70">Help us personalize your dashboard experience</p>
        </div>

        <div className="flex justify-center">
          <div className="flex w-2/3 items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1 ? "bg-amber-400" : "bg-white/20"
              }`}
            >
              {step > 1 ? <Check className="h-5 w-5 text-black" /> : <span className="text-sm">1</span>}
            </div>
            <div
              className={`h-1 flex-1 ${step > 1 ? "bg-gradient-to-r from-amber-400 to-amber-600" : "bg-white/20"}`}
            ></div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2 ? "bg-amber-400" : "bg-white/20"
              }`}
            >
              {step > 2 ? <Check className="h-5 w-5 text-black" /> : <span className="text-sm">2</span>}
            </div>
            <div
              className={`h-1 flex-1 ${step > 2 ? "bg-gradient-to-r from-amber-400 to-amber-600" : "bg-white/20"}`}
            ></div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 3 ? "bg-amber-400" : "bg-white/20"
              }`}
            >
              <span className="text-sm">3</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-white/70">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  placeholder="Acme Inc."
                  required
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-white/70">
                  Industry
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)} required>
                  <SelectTrigger className="border-white/20 bg-white/5 text-white w-full focus:border-amber-400/50 focus:ring-amber-400/50">
                    <SelectValue placeholder="Select your industry" className="w-full" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-black/90 text-white backdrop-blur-md">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenueRange" className="text-white/70">
                    Annual Revenue
                  </Label>
                  <Select
                    value={formData.revenueRange}
                    onValueChange={(value) => handleChange("revenueRange", value)}
                    required
                  >
                    <SelectTrigger className="border-white/20 w-full bg-white/5 text-white focus:border-amber-400/50 focus:ring-amber-400/50">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 text-white backdrop-blur-md">
                      {revenueRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-white/70">
                    Number of Employees
                  </Label>
                  <Select
                    value={formData.employeeCount}
                    onValueChange={(value) => handleChange("employeeCount", value)}
                    required
                  >
                    <SelectTrigger className="border-white/20 w-full bg-white/5 text-white focus:border-amber-400/50 focus:ring-amber-400/50">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 text-white backdrop-blur-md">
                      {employeeRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-white/70">
                  Company Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="https://example.com"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-black transition-all duration-300 hover:from-amber-500 hover:to-amber-700"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-amber-400" />
                  <div className="font-medium">{formData.businessName}</div>
                  <div className="text-sm text-white/70">{formData.industry}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70">Social Media Profiles</Label>
                <p className="text-xs text-white/50">
                  Connect your social profiles to enable sentiment tracking and analysis
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-white/70">
                    Twitter / X
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/20 bg-white/10 px-3 text-sm text-white/50">
                      @
                    </div>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => handleChange("twitter", e.target.value)}
                      placeholder="username"
                      className="rounded-l-none border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-white/70">
                    LinkedIn
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/20 bg-white/10 px-3 text-sm text-white/50">
                      linkedin.com/company/
                    </div>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      placeholder="company-name"
                      className="rounded-l-none border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-white/70">
                    Facebook
                  </Label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-white/20 bg-white/10 px-3 text-sm text-white/50">
                      facebook.com/
                    </div>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleChange("facebook", e.target.value)}
                      placeholder="pagename"
                      className="rounded-l-none border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-black transition-all duration-300 hover:from-amber-500 hover:to-amber-700"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-white/10 bg-gradient-to-r from-amber-400/10 to-amber-600/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/20">
                    <Check className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">You're all set!</h3>
                    <p className="text-white/70">
                      We've collected all the information we need to personalize your dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 font-medium">Business Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-white/70">Business Name:</div>
                    <div>{formData.businessName}</div>
                    <div className="text-white/70">Industry:</div>
                    <div>{formData.industry}</div>
                    <div className="text-white/70">Revenue Range:</div>
                    <div>{formData.revenueRange}</div>
                    <div className="text-white/70">Employee Count:</div>
                    <div>{formData.employeeCount}</div>
                    <div className="text-white/70">Website:</div>
                    <div>{formData.website}</div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 font-medium">Social Profiles</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-white/70">Twitter:</div>
                    <div>{formData.twitter ? `@${formData.twitter}` : "Not provided"}</div>
                    <div className="text-white/70">LinkedIn:</div>
                    <div>{formData.linkedin ? `linkedin.com/company/${formData.linkedin}` : "Not provided"}</div>
                    <div className="text-white/70">Facebook:</div>
                    <div>{formData.facebook ? `facebook.com/${formData.facebook}` : "Not provided"}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-black transition-all duration-300 hover:from-amber-500 hover:to-amber-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up your dashboard...
                    </>
                  ) : (
                    "Go to Dashboard"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
