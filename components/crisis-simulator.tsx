"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample crisis scenarios
const getCrisisScenarios = (company: string) => {
  if (company === "Nike") {
    return [
      {
        id: "labor",
        name: "Labor Controversy",
        description: "Reports of poor working conditions in manufacturing facilities",
      },
      {
        id: "product",
        name: "Product Defect",
        description: "Widespread product quality issues affecting customer safety",
      },
      {
        id: "endorsement",
        name: "Endorsement Scandal",
        description: "Controversy involving a high-profile brand ambassador",
      },
      {
        id: "sustainability",
        name: "Environmental Impact",
        description: "Reports of unsustainable manufacturing practices",
      },
    ]
  } else if (company === "Facebook") {
    return [
      { id: "privacy", name: "Data Privacy Breach", description: "Major leak of user personal information" },
      {
        id: "misinformation",
        name: "Misinformation Spread",
        description: "Platform used to spread harmful misinformation",
      },
      { id: "regulation", name: "Regulatory Action", description: "Government investigation into business practices" },
      { id: "moderation", name: "Content Moderation Failure", description: "Harmful content not properly moderated" },
    ]
  } else {
    return [
      { id: "sourcing", name: "Unethical Sourcing", description: "Reports of unethical ingredient sourcing practices" },
      { id: "safety", name: "Product Safety Concern", description: "Health concerns related to product ingredients" },
      {
        id: "environmental",
        name: "Environmental Damage",
        description: "Reports of environmental damage from operations",
      },
      { id: "labor", name: "Labor Rights Issues", description: "Labor rights violations in supply chain" },
    ]
  }
}

// Sample mitigation strategies
const getMitigationStrategies = (scenario: string) => {
  const commonStrategies = [
    {
      id: "transparent",
      name: "Transparent Communication",
      effectiveness: 75,
      description: "Openly acknowledge the issue and communicate plans to address it",
    },
    {
      id: "immediate",
      name: "Immediate Action",
      effectiveness: 85,
      description: "Take swift and decisive action to address the root cause",
    },
    {
      id: "thirdparty",
      name: "Third-Party Audit",
      effectiveness: 70,
      description: "Engage independent auditors to verify facts and recommend solutions",
    },
    {
      id: "compensation",
      name: "Stakeholder Compensation",
      effectiveness: 65,
      description: "Provide compensation or remediation to affected parties",
    },
    {
      id: "policy",
      name: "Policy Reform",
      effectiveness: 80,
      description: "Implement new policies to prevent similar issues in the future",
    },
  ]

  return commonStrategies
}

export function CrisisSimulator({ company }: { company: string }) {
  const [selectedScenario, setSelectedScenario] = useState<string>("")
  const [intensity, setIntensity] = useState<number>(50)
  const [selectedStrategy, setSelectedStrategy] = useState<string>("")
  const [isSimulated, setIsSimulated] = useState<boolean>(false)

  const scenarios = getCrisisScenarios(company)
  const strategies = getMitigationStrategies(selectedScenario)

  const handleSimulate = () => {
    setIsSimulated(true)
  }

  const handleReset = () => {
    setIsSimulated(false)
    setSelectedStrategy("")
  }

  const getStrategyEffectiveness = () => {
    if (!selectedStrategy) return 0

    const strategy = strategies.find((s) => s.id === selectedStrategy)
    if (!strategy) return 0

    // Adjust effectiveness based on crisis intensity
    const intensityFactor = 1 - (intensity / 100) * 0.3
    return Math.round(strategy.effectiveness * intensityFactor)
  }

  const getReputationImpact = () => {
    if (!isSimulated) return 0

    // Base impact depends on intensity
    const baseImpact = -Math.round(intensity * 0.6)

    // Mitigation from strategy
    const mitigation = getStrategyEffectiveness() * 0.5

    return Math.max(-100, Math.min(0, baseImpact + mitigation))
  }

  const getRecoveryTime = () => {
    if (!isSimulated) return "N/A"

    const impact = Math.abs(getReputationImpact())

    if (impact < 10) return "1-2 weeks"
    if (impact < 20) return "1-2 months"
    if (impact < 30) return "3-6 months"
    return "6+ months"
  }

  const getImpactLevel = () => {
    const impact = Math.abs(getReputationImpact())

    if (impact < 10) return { label: "Low", color: "default" }
    if (impact < 20) return { label: "Medium", color: "warning" }
    if (impact < 30) return { label: "High", color: "destructive" }
    return { label: "Severe", color: "destructive" }
  }

  const impactLevel = getImpactLevel()

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Crisis Scenario</label>
          <Select value={selectedScenario} onValueChange={setSelectedScenario} disabled={isSimulated}>
            <SelectTrigger>
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Crisis Intensity</label>
          <div className="pt-2">
            <Slider
              value={[intensity]}
              min={10}
              max={90}
              step={10}
              onValueChange={(value) => setIntensity(value[0])}
              disabled={isSimulated}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {selectedScenario && (
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Mitigation Strategy</label>
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy} disabled={isSimulated}>
            <SelectTrigger>
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              {strategies.map((strategy) => (
                <SelectItem key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-between mb-4">
        {!isSimulated ? (
          <Button onClick={handleSimulate} disabled={!selectedScenario || !selectedStrategy} className="w-full">
            Run Simulation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="w-full">
            Reset Simulation
          </Button>
        )}
      </div>

      {isSimulated && (
        <Card className="flex-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Simulation Results</h4>
              <Badge variant={impactLevel.color as any}>
                <AlertTriangle className="mr-1 h-3 w-3" />
                {impactLevel.label} Impact
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reputation Impact</span>
                <span className="font-medium text-destructive">{getReputationImpact()}%</span>
              </div>
              <Progress value={100 + getReputationImpact()} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Strategy Effectiveness</span>
                <span className="font-medium text-green-500">{getStrategyEffectiveness()}%</span>
              </div>
              <Progress value={getStrategyEffectiveness()} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estimated Recovery Time</span>
                <span className="font-medium">{getRecoveryTime()}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">AI-Generated Recommendations</h4>
              <ScrollArea className="h-[80px]">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Implement the selected strategy immediately to minimize reputation damage.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Prepare a comprehensive communication plan for all stakeholders.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <p>Monitor social media and news coverage closely for the next 72 hours.</p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
