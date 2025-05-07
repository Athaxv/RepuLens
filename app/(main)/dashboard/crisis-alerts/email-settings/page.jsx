"use client"

import { useState } from "react"
import { AlertTriangle, Bell, Check, Clock, Mail, Save } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CrisisAlertsEmailSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    email: "user@example.com",
    frequency: "immediate",
    sentimentThreshold: 15,
    includeDetails: true,
    includeSummary: true,
    includeRecommendations: true,
    notifyOnPositive: false,
    notifyOnNeutral: false,
    notifyOnNegative: true,
    customTemplate: false,
    templateContent:
      "Dear {{name}},\n\nA significant change in sentiment has been detected for {{company}}.\n\nCurrent Sentiment: {{sentiment}}\nChange: {{change}}%\n\n{{details}}\n\nRecommended Actions:\n{{recommendations}}\n\nBest regards,\nRepulens Team",
  })

  const [saveStatus, setSaveStatus] = useState<null | "saving" | "success" | "error">(null)

  const handleSaveSettings = async () => {
    setSaveStatus("saving")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setSaveStatus("success")

    // Reset status after 3 seconds
    setTimeout(() => {
      setSaveStatus(null)
    }, 3000)
  }

  const handleInputChange = (field, value) => {
    setEmailSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTestEmail = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    // Show success message (in a real app, use a toast notification)
    alert("Test email sent successfully!")
  }

  return (
    <div className="container py-6 md:py-8 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Crisis Alert Email Settings</h1>
          <Badge variant="outline" className="gap-1 border-amber-500 text-amber-500">
            <Bell className="h-3 w-3" />
            Notifications
          </Badge>
        </div>
        <p className="text-muted-foreground">Configure how and when you receive crisis alert notifications via email</p>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="thresholds">Alert Thresholds</TabsTrigger>
          <TabsTrigger value="template">Email Template</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>Configure your email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive crisis alerts via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailSettings.enabled}
                  onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <Input
                  id="email-address"
                  type="email"
                  placeholder="your@email.com"
                  value={emailSettings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Crisis alerts will be sent to this email address</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select
                  value={emailSettings.frequency}
                  onValueChange={(value) => handleInputChange("frequency", value)}
                >
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (As they happen)</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">How often you want to receive crisis alert emails</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Email Content</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-details"
                      checked={emailSettings.includeDetails}
                      onCheckedChange={(checked) => handleInputChange("includeDetails", checked)}
                    />
                    <Label htmlFor="include-details">Include detailed analysis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-summary"
                      checked={emailSettings.includeSummary}
                      onCheckedChange={(checked) => handleInputChange("includeSummary", checked)}
                    />
                    <Label htmlFor="include-summary">Include executive summary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-recommendations"
                      checked={emailSettings.includeRecommendations}
                      onCheckedChange={(checked) => handleInputChange("includeRecommendations", checked)}
                    />
                    <Label htmlFor="include-recommendations">Include recommended actions</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to defaults
                  setEmailSettings({
                    ...emailSettings,
                    enabled: true,
                    frequency: "immediate",
                    includeDetails: true,
                    includeSummary: true,
                    includeRecommendations: true,
                  })
                }}
              >
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : saveStatus === "success" ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
              <CardDescription>Configure when crisis alerts are triggered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Sentiment Change Threshold</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Minimum change to trigger alert: {emailSettings.sentimentThreshold}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {emailSettings.sentimentThreshold < 10
                        ? "Very Sensitive"
                        : emailSettings.sentimentThreshold < 20
                          ? "Sensitive"
                          : emailSettings.sentimentThreshold < 30
                            ? "Moderate"
                            : "Less Sensitive"}
                    </span>
                  </div>
                  <Slider
                    value={[emailSettings.sentimentThreshold]}
                    min={5}
                    max={40}
                    step={1}
                    onValueChange={(value) => handleInputChange("sentimentThreshold", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Alerts will be triggered when sentiment changes by at least this percentage
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Alert Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-negative"
                      checked={emailSettings.notifyOnNegative}
                      onCheckedChange={(checked) => handleInputChange("notifyOnNegative", checked)}
                    />
                    <Label htmlFor="notify-negative" className="flex items-center gap-2">
                      Negative sentiment changes
                      <Badge className="bg-red-500/20 text-red-500">Critical</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-neutral"
                      checked={emailSettings.notifyOnNeutral}
                      onCheckedChange={(checked) => handleInputChange("notifyOnNeutral", checked)}
                    />
                    <Label htmlFor="notify-neutral" className="flex items-center gap-2">
                      Neutral sentiment changes
                      <Badge className="bg-blue-500/20 text-blue-500">Informational</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-positive"
                      checked={emailSettings.notifyOnPositive}
                      onCheckedChange={(checked) => handleInputChange("notifyOnPositive", checked)}
                    />
                    <Label htmlFor="notify-positive" className="flex items-center gap-2">
                      Positive sentiment changes
                      <Badge className="bg-green-500/20 text-green-500">Favorable</Badge>
                    </Label>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced">
                  <AccordionTrigger className="text-sm font-medium">Advanced Settings</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cooldown-period">Alert Cooldown Period</Label>
                      <Select defaultValue="1h">
                        <SelectTrigger id="cooldown-period">
                          <SelectValue placeholder="Select cooldown period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30m">30 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="3h">3 hours</SelectItem>
                          <SelectItem value="6h">6 hours</SelectItem>
                          <SelectItem value="12h">12 hours</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">Minimum time between alerts for the same company</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-points">Minimum Data Points</Label>
                      <Select defaultValue="10">
                        <SelectTrigger id="data-points">
                          <SelectValue placeholder="Select minimum data points" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 data points</SelectItem>
                          <SelectItem value="10">10 data points</SelectItem>
                          <SelectItem value="20">20 data points</SelectItem>
                          <SelectItem value="50">50 data points</SelectItem>
                          <SelectItem value="100">100 data points</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Minimum number of data points required to trigger an alert
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to defaults
                  setEmailSettings({
                    ...emailSettings,
                    sentimentThreshold: 15,
                    notifyOnPositive: false,
                    notifyOnNeutral: false,
                    notifyOnNegative: true,
                  })
                }}
              >
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : saveStatus === "success" ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>Customize the email template for crisis alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-template">Use Custom Template</Label>
                  <p className="text-sm text-muted-foreground">Customize the email template for crisis alerts</p>
                </div>
                <Switch
                  id="custom-template"
                  checked={emailSettings.customTemplate}
                  onCheckedChange={(checked) => handleInputChange("customTemplate", checked)}
                />
              </div>

              {emailSettings.customTemplate && (
                <div className="space-y-2">
                  <Label htmlFor="template-content">Email Template</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Enter your custom email template"
                    className="min-h-[200px] font-mono text-sm"
                    value={emailSettings.templateContent}
                    onChange={(e) => handleInputChange("templateContent", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Use the following variables in your template:</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <Badge variant="outline" className="justify-start">
                      {"{{name}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{company}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{sentiment}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{change}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{details}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{recommendations}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{date}}"}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      {"{{time}}"}
                    </Badge>
                  </div>
                </div>
              )}

              {!emailSettings.customTemplate && (
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Default Template Preview</div>
                    <div className="rounded-md bg-muted p-4 text-sm">
                      <p>Dear [User Name],</p>
                      <br />
                      <p>A significant change in sentiment has been detected for [Company Name].</p>
                      <br />
                      <p>Current Sentiment: [Sentiment Score]</p>
                      <p>Change: [Change Percentage]%</p>
                      <br />
                      <p>[Detailed Analysis]</p>
                      <br />
                      <p>Recommended Actions:</p>
                      <p>[Recommendations]</p>
                      <br />
                      <p>Best regards,</p>
                      <p>Repulens Team</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to defaults
                  setEmailSettings({
                    ...emailSettings,
                    customTemplate: false,
                    templateContent:
                      "Dear {{name}},\n\nA significant change in sentiment has been detected for {{company}}.\n\nCurrent Sentiment: {{sentiment}}\nChange: {{change}}%\n\n{{details}}\n\nRecommended Actions:\n{{recommendations}}\n\nBest regards,\nRepulens Team",
                  })
                }}
              >
                Reset to Default Template
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : saveStatus === "success" ? (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Preview</CardTitle>
              <CardDescription>Preview how your crisis alert emails will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm font-medium">Crisis Alert: Significant Sentiment Change Detected</div>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <div>From: Repulens Alerts &lt;alerts@repulens.com&gt;</div>
                    <div>To: {emailSettings.email}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                    </div>

                    <div className="text-center text-xl font-bold">Crisis Alert: Significant Sentiment Drop</div>

                    <div className="rounded-md bg-muted/50 p-4 text-sm">
                      <p>Dear User,</p>
                      <br />
                      <p>
                        A significant change in sentiment has been detected for <strong>TechVision Inc.</strong>
                      </p>
                      <br />
                      <div className="rounded-md bg-red-500/10 p-3 text-red-500">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">Sentiment dropped by 18.5%</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Detected on May 8, 2024 at 10:45 AM</span>
                        </div>
                      </div>
                      <br />
                      {emailSettings.includeDetails && (
                        <>
                          <p className="font-medium">Detailed Analysis:</p>
                          <p>
                            The sentiment drop appears to be related to recent social media discussions about product
                            quality issues. There has been a 215% increase in negative mentions across Twitter and
                            Facebook in the last 24 hours.
                          </p>
                          <br />
                        </>
                      )}

                      {emailSettings.includeSummary && (
                        <>
                          <p className="font-medium">Executive Summary:</p>
                          <p>
                            A potential crisis is developing due to customer complaints about the latest product
                            release. The issue is gaining traction on social media and could impact brand reputation if
                            not addressed promptly.
                          </p>
                          <br />
                        </>
                      )}

                      {emailSettings.includeRecommendations && (
                        <>
                          <p className="font-medium">Recommended Actions:</p>
                          <ul className="list-inside list-disc space-y-1">
                            <li>Prepare a public statement addressing the concerns</li>
                            <li>Engage with key negative commenters directly</li>
                            <li>Monitor social media channels closely for the next 48 hours</li>
                            <li>Consider a temporary pause on marketing campaigns</li>
                          </ul>
                          <br />
                        </>
                      )}

                      <p>
                        You can view more details and take action by visiting your{" "}
                        <a href="#" className="text-primary underline">
                          Crisis Management Dashboard
                        </a>
                        .
                      </p>
                      <br />
                      <p>Best regards,</p>
                      <p>Repulens Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleTestEmail} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Test Email"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
