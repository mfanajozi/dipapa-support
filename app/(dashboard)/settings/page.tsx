"use client"

import { useState } from "react"
import { Moon, Sun, Lock, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock settings data
const mockSettings = {
  notifications: {
    email: {
      newUser: true,
      newQuery: true,
      queryResolved: true,
      newStipend: true,
      systemUpdates: false,
    },
    push: {
      newUser: false,
      newQuery: true,
      queryResolved: false,
      newStipend: true,
      systemUpdates: false,
    },
  },
  appearance: {
    theme: "light",
    sidebarCompact: false,
    colorScheme: "default",
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordLastChanged: "2023-01-15T10:30:00Z",
  },
  system: {
    language: "en",
    timezone: "Africa/Johannesburg",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSave = () => {
    // In a real app, you would save the settings to the database
    console.log("Settings saved:", settings)
  }

  const handlePasswordChange = () => {
    // In a real app, you would validate and update the password
    console.log("Password change requested")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-new-user">New User Registration</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a new user registers</p>
                </div>
                <Switch
                  id="email-new-user"
                  checked={settings.notifications.email.newUser}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: {
                          ...settings.notifications.email,
                          newUser: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-new-query">New Query</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a new query is submitted</p>
                </div>
                <Switch
                  id="email-new-query"
                  checked={settings.notifications.email.newQuery}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: {
                          ...settings.notifications.email,
                          newQuery: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-query-resolved">Query Resolved</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a query is resolved</p>
                </div>
                <Switch
                  id="email-query-resolved"
                  checked={settings.notifications.email.queryResolved}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: {
                          ...settings.notifications.email,
                          queryResolved: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-new-stipend">New Stipend Request</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new stipend requests</p>
                </div>
                <Switch
                  id="email-new-stipend"
                  checked={settings.notifications.email.newStipend}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: {
                          ...settings.notifications.email,
                          newStipend: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                </div>
                <Switch
                  id="email-system-updates"
                  checked={settings.notifications.email.systemUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: {
                          ...settings.notifications.email,
                          systemUpdates: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Configure which push notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-new-user">New User Registration</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a new user registers</p>
                </div>
                <Switch
                  id="push-new-user"
                  checked={settings.notifications.push.newUser}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: {
                          ...settings.notifications.push,
                          newUser: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-new-query">New Query</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a new query is submitted</p>
                </div>
                <Switch
                  id="push-new-query"
                  checked={settings.notifications.push.newQuery}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: {
                          ...settings.notifications.push,
                          newQuery: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-query-resolved">Query Resolved</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when a query is resolved</p>
                </div>
                <Switch
                  id="push-query-resolved"
                  checked={settings.notifications.push.queryResolved}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: {
                          ...settings.notifications.push,
                          queryResolved: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-new-stipend">New Stipend Request</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new stipend requests</p>
                </div>
                <Switch
                  id="push-new-stipend"
                  checked={settings.notifications.push.newStipend}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: {
                          ...settings.notifications.push,
                          newStipend: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                </div>
                <Switch
                  id="push-system-updates"
                  checked={settings.notifications.push.systemUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: {
                          ...settings.notifications.push,
                          systemUpdates: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <RadioGroup
                  defaultValue={settings.appearance.theme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        theme: value,
                      },
                    })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center gap-1">
                      <Sun className="h-4 w-4" /> Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center gap-1">
                      <Moon className="h-4 w-4" /> Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-compact">Compact Sidebar</Label>
                    <p className="text-sm text-muted-foreground">Use a more compact sidebar layout</p>
                  </div>
                  <Switch
                    id="sidebar-compact"
                    checked={settings.appearance.sidebarCompact}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        appearance: {
                          ...settings.appearance,
                          sidebarCompact: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select
                  defaultValue={settings.appearance.colorScheme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        colorScheme: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Password last changed: {new Date(settings.security.passwordLastChanged).toLocaleDateString()}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePasswordChange} className="ml-auto">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure additional security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        twoFactorAuth: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select
                  defaultValue={settings.security.sessionTimeout}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        sessionTimeout: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  defaultValue={settings.system.language}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        language: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="af">Afrikaans</SelectItem>
                    <SelectItem value="zu">Zulu</SelectItem>
                    <SelectItem value="xh">Xhosa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  defaultValue={settings.system.timezone}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        timezone: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Africa/Johannesburg">Africa/Johannesburg</SelectItem>
                    <SelectItem value="Africa/Cape_Town">Africa/Cape Town</SelectItem>
                    <SelectItem value="Africa/Durban">Africa/Durban</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select
                  defaultValue={settings.system.dateFormat}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        dateFormat: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-format">Time Format</Label>
                <Select
                  defaultValue={settings.system.timeFormat}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        timeFormat: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

