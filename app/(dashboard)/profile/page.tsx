"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Calendar, Shield, Building, Clock, Edit, Save, X, Camera } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getInitials } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface SupportTeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  location: string;
  joined_date: string;
  last_active: string;
  bio: string;
  avatar_url: string;
  permissions: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<SupportTeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // Get the current user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session?.user) {
          router.push('/login');
          return;
        }

        // Fetch the user's profile from support_team table
        const { data, error: profileError } = await supabase
          .from('support_team')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          if (profileError.code === '42501') {
            setError('You do not have permission to access this profile. Please contact your administrator.');
          } else {
            setError('Failed to load profile data. Please try again later.');
          }
          return;
        }
        
        if (data) {
          setUserProfile({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
            department: data.department,
            phone: data.phone,
            location: data.location,
            joined_date: data.joined_date,
            last_active: data.last_active,
            bio: data.bio,
            avatar_url: data.avatar_url,
            permissions: data.permissions || []
          });
        } else {
          // Instead of creating a new record, show a message
          setError('Profile not found. Please contact your administrator to set up your profile.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  const handleSave = async () => {
    if (!userProfile) return;
    
    setIsSaving(true);
    try {
      const { error: updateError } = await supabase
        .from('support_team')
        .update({
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          phone: userProfile.phone,
          location: userProfile.location,
          department: userProfile.department,
          bio: userProfile.bio,
          last_active: new Date().toISOString()
        })
        .eq('id', userProfile.id);

      if (updateError) {
        if (updateError.code === '42501') {
          throw new Error('You do not have permission to update this profile.');
        }
        throw updateError;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Profile Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Profile not found'}</p>
          <Button onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const fullName = `${userProfile.first_name} ${userProfile.last_name}`;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                disabled={isSaving}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </div>
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
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={userProfile.first_name}
                      onChange={(e) => setUserProfile({ ...userProfile, first_name: e.target.value })}
                      placeholder="First Name"
                    />
                    <Input
                      value={userProfile.last_name}
                      onChange={(e) => setUserProfile({ ...userProfile, last_name: e.target.value })}
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                ) : (
                  <span>{userProfile.phone || 'Not set'}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userProfile.department}
                    onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
                    placeholder="Department"
                  />
                ) : (
                  <span>{userProfile.department}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                    placeholder="Location"
                  />
                ) : (
                  <span>{userProfile.location || 'Not set'}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(userProfile.joined_date).toLocaleDateString()}</span>
              </div>
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>
              )}
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
    </div>
  );
}

