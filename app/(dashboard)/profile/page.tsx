"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Calendar, Shield, Building, Clock, Edit, Save, X, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getInitials } from "@/lib/utils"

// Mock data for the logged-in user
const mockUser = {
  id: "u1",
  email: "admin@dipapa.com",
  first_name: "Admin",
  surname: "User",
  role: "Administrator",
  department: "IT Support",
  phone: "+27 71 234 5678",
  location: "Head Office",
  joined_date: "2022-01-15",
  last_active: "2023-03-25T10:30:00Z",
  bio: "Experienced administrator with expertise in user management and system configuration. Responsible for overseeing the CRM platform and providing support to team members.",
  avatar_url: "",
  permissions: ["User Management", "Content Management", "Report Generation", "System Configuration"],
}

// Mock activity logs
const mockActivityLogs = [
  {
    id: "a1",
    action: "User Updated",
    details: "Updated user profile for Sarah Johnson",
    timestamp: "2023-03-25T10:30:00Z",
  },
  {
    id: "a2",
    action: "Query Resolved",
    details: "Resolved maintenance query for North Tower",
    timestamp: "2023-03-24T14:45:00Z",
  },
  {
    id: "a3",
    action: "Content Published",
    details: "Published new announcement about Wi-Fi maintenance",
    timestamp: "2023-03-23T09:15:00Z",
  },
  {
    id: "a4",
    action: "Report Generated",
    details: "Generated monthly user activity report",
    timestamp: "2023-03-22T16:20:00Z",
  },
  {
    id: "a5",
    action: "System Update",
    details: "Applied system updates and configuration changes",
    timestamp: "2023-03-21T11:10:00Z",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState(mockUser)
  const fullName = `${userProfile.first_name} ${userProfile.surname}`

  const handleSave = () => {
    // In a real app, you would save the changes to the database
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original data
    setUserProfile(mockUser)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Profile</CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile.avatar_url} alt={fullName} />
                    <AvatarFallback className="text-xl">{getInitials(fullName)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change avatar</span>
                    </Button>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{fullName}</h2>
                  <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{userProfile.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(userProfile.joined_date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Your system access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userProfile.permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
              <CardDescription>Professional information and bio</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={userProfile.first_name}
                        onChange={(e) => setUserProfile({ ...userProfile, first_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Surname</Label>
                      <Input
                        id="surname"
                        value={userProfile.surname}
                        onChange={(e) => setUserProfile({ ...userProfile, surname: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={userProfile.department}
                        onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={5}
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm">{userProfile.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLogs.map((log) => (
                  <div key={log.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{log.action}</p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <p className="text-xs">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

