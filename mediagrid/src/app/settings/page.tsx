"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserProfile } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Camera, LogOut } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { currentUser, logout, updateUserProfile, uploadProfileImage } =
    useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth");
      return;
    }

    setDisplayName(currentUser.displayName || "");
    setBio(currentUser.bio || "");
    setIsPrivate(currentUser.isPrivate || false);
  }, [currentUser, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    try {
      setIsSubmitting(true);

      const updatedData: Partial<UserProfile> = {
        displayName,
        bio,
        isPrivate,
      };

      await updateUserProfile(updatedData);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSubmitting(true);
      await uploadProfileImage(file);
      toast({
        title: "Profile updated",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to update your profile picture.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-3 px-2 xs:px-3 sm:px-4 md:px-0 mb-20 sm:mb-0">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8 rounded-lg overflow-hidden">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white rounded-none"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white rounded-none"
            >
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile details and privacy settings
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleUpdateProfile}>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative" onClick={handleImageClick}>
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={currentUser?.photoURL || undefined} />
                        <AvatarFallback>
                          {getInitials(currentUser?.displayName ?? null)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-mediagrid-purple text-white rounded-full p-1.5 cursor-pointer">
                        <Camera size={18} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click to upload a new profile picture
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="private"
                      checked={isPrivate}
                      onCheckedChange={setIsPrivate}
                    />
                    <Label htmlFor="private">Private Account</Label>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="gradient-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and login settings
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="flex items-center justify-between p-3 bg-mediagrid-purple/20 dark:bg-mediagrid-purple/40 rounded">
                    <span className="font-medium">{currentUser?.email}</span>
                    <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded px-2 py-1">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Logout</h3>
                  <p className="text-muted-foreground mb-4">
                    Log out of your account on this device
                  </p>
                  <Button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </MainLayout>
  );
};

export default SettingsPage;
