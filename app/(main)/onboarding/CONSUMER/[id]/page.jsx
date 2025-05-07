"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronRight, Loader2, Sparkles, User } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
// import { BackgroundEffect } from "@/components/background-effect"

export default function ConsumerOnboardingPage() {
  const params = useParams()
  const userId = params.id
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    interests: [],
    companiesTracked: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests || []; // fallback to empty array
  
      const updatedInterests = interests.includes(interest)
        ? interests.filter((i) => i !== interest)
        : [...interests, interest];
  
      return { ...prev, interests: updatedInterests };
    });
  };
  

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  console.log(formData)
  // console.log("id",userId)
  try {
    const requestData = {
      ...formData,
      // Make sure these are always arrays even if empty
      industries: Array.isArray(formData.industries) 
        ? formData.industries 
        : formData.industries.split(",").map(item => item.trim()),
      companiesTracked: Array.isArray(formData.companiesTracked)
        ? formData.companiesTracked
        : formData.companiesTracked.split(",").map(item => item.trim())
    };
    console.log("Sending data:", JSON.stringify(requestData));
    const res = await fetch(`/api/onboarding/consumer/${userId}`, {
      method: "POST", // Use "POST" if you're creating, "PUT" for updating
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({formData}),
    });


    const data = await res.json()
    if (!res.ok) throw new Error("Failed to save consumer details");

    // Show success toast (adjust according to your toast library)
    toast("Profile updated successfully!");

    // Redirect to dashboard
    router.push("/dashboard");
  } catch (error) {
    toast("Error saving profile. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


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
    "Automotive",
    "Energy",
    "Real Estate",
  ]

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
          <h1 className="text-2xl font-bold">Set up your profile</h1>
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
                <Label htmlFor="name" className="text-white/70">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                  required
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-white/70">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  placeholder="Marketing Manager"
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white/70">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Acme Inc."
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
                  <User className="h-5 w-5 text-amber-400" />
                  <div className="font-medium">{formData.name}</div>
                  {formData.jobTitle && <div className="text-sm text-white/70">{formData.jobTitle}</div>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70">Industries of Interest</Label>
                <p className="text-xs text-white/50">
                  Select the industries you're interested in tracking. This helps us personalize your dashboard.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={formData.interests.includes(industry)}
                      onCheckedChange={() => handleInterestToggle(industry)}
                      className="border-white/20 data-[state=checked]:border-amber-400 data-[state=checked]:bg-amber-400 data-[state=checked]:text-black"
                    />
                    <Label
                      htmlFor={industry}
                      className="cursor-pointer text-sm font-normal text-white/90 hover:text-white"
                    >
                      {industry}
                    </Label>
                  </div>
                ))}
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
              <div className="space-y-2">
                <Label htmlFor="companiesTracked" className="text-white/70">
                  Companies to Track
                </Label>
                <p className="text-xs text-white/50">
                  Enter the names of companies you'd like to track, separated by commas.
                </p>
                <Input
                  id="companiesTracked"
                  value={formData.companiesTracked}
                  onChange={(e) => handleChange("companiesTracked", e.target.value)}
                  placeholder="Apple, Microsoft, Google, etc."
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
                />
              </div>

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
                  <h4 className="mb-2 font-medium">Profile Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-white/70">Name:</div>
                    <div>{formData.name}</div>
                    <div className="text-white/70">Job Title:</div>
                    <div>{formData.jobTitle || "Not provided"}</div>
                    <div className="text-white/70">Company:</div>
                    <div>{formData.company || "Not provided"}</div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 font-medium">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.length > 0 ? (
                      formData.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-medium text-amber-400"
                        >
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-white/50">No industries selected</span>
                    )}
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
