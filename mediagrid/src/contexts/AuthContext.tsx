"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bio?: string;
  followers?: string[];
  following?: string[];
  isPrivate?: boolean;
}

interface AuthContextProps {
  currentUser: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<string>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  authError: string | null;
  setAuthError: (msg: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  async function getUserProfile(user: User): Promise<UserProfile> {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }

    // If no profile exists, create a basic one
    const newProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      followers: [],
      following: [],
      isPrivate: false,
    };

    await setDoc(userDocRef, newProfile);
    return newProfile;
  }

  async function signup(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        // Create a user profile document
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          photoURL: null,
          followers: [],
          following: [],
          isPrivate: false,
        });
      }

      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      setAuthError(null);
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in!",
        description: "You've been successfully logged in.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      setAuthError(
        typeof error === "object" &&
          error &&
          "code" in error &&
          (error as { code?: unknown }).code === "auth/invalid-credential"
          ? "Invalid email or password. Please check your credentials and try again."
          : "Login failed. Please try again."
      );
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast({
        title: "Logged out!",
        description: "You've been successfully logged out.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function uploadProfileImage(file: File) {
    if (!currentUser) throw new Error("No authenticated user");

    const fileRef = ref(
      storage,
      `profile_images/${currentUser.uid}/${file.name}`
    );
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);

    // Update the user's photoURL in Firebase Auth
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });
    }

    // Update the user's photoURL in Firestore
    await updateUserProfile({ photoURL: downloadURL });

    return downloadURL;
  }

  async function updateUserProfile(data: Partial<UserProfile>) {
    if (!currentUser) throw new Error("No authenticated user");

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, data, { merge: true });

      // Update the current user state
      setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));

      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function followUser(userId: string) {
    if (!currentUser) throw new Error("No authenticated user");
    if (userId === currentUser.uid)
      throw new Error("You cannot follow yourself");

    try {
      // Add the user to the current user's following list
      const currentFollowing = [...(currentUser.following || [])];
      if (!currentFollowing.includes(userId)) {
        currentFollowing.push(userId);
        await updateUserProfile({ following: currentFollowing });

        // Add the current user to the target user's followers list
        const targetUserRef = doc(db, "users", userId);
        const targetUserDoc = await getDoc(targetUserRef);

        if (targetUserDoc.exists()) {
          const targetUser = targetUserDoc.data() as UserProfile;
          const targetFollowers = [...(targetUser.followers || [])];

          if (!targetFollowers.includes(currentUser.uid)) {
            targetFollowers.push(currentUser.uid);
            await setDoc(
              targetUserRef,
              { followers: targetFollowers },
              { merge: true }
            );
          }
        }

        toast({
          title: "Followed!",
          description: "You're now following this user.",
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function unfollowUser(userId: string) {
    if (!currentUser) throw new Error("No authenticated user");

    try {
      // Remove the user from the current user's following list
      const currentFollowing = [...(currentUser.following || [])];
      const updatedFollowing = currentFollowing.filter((id) => id !== userId);

      if (currentFollowing.length !== updatedFollowing.length) {
        await updateUserProfile({ following: updatedFollowing });

        // Remove the current user from the target user's followers list
        const targetUserRef = doc(db, "users", userId);
        const targetUserDoc = await getDoc(targetUserRef);

        if (targetUserDoc.exists()) {
          const targetUser = targetUserDoc.data() as UserProfile;
          const targetFollowers = [...(targetUser.followers || [])];
          const updatedFollowers = targetFollowers.filter(
            (id) => id !== currentUser.uid
          );

          if (targetFollowers.length !== updatedFollowers.length) {
            await setDoc(
              targetUserRef,
              { followers: updatedFollowers },
              { merge: true }
            );
          }
        }

        toast({
          title: "Unfollowed!",
          description: "You've unfollowed this user.",
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          typeof error === "object" && error && "message" in error
            ? String((error as { message?: unknown }).message)
            : "An unknown error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user);
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,
    uploadProfileImage,
    followUser,
    unfollowUser,
    authError,
    setAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
