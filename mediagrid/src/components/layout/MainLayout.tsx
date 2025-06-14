"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useAuth } from "@/contexts/AuthContext";
import NotificationModal from "@/components/modals/NotificationModal";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Shared notification modal state
  const [notifOpen, setNotifOpen] = useState(false);

  // Redirect to auth page if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      router.push("/auth");
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navbar */}
      <Navbar onOpenNotifications={() => setNotifOpen(true)} />
      {/* Main area: sidebar + content */}
      <div className="flex flex-1 min-h-0 bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex w-64 flex-shrink-0">
          <Sidebar onOpenNotifications={() => setNotifOpen(true)} />
        </div>
        {/* Main content area */}
        <main className="flex-1 p-0 md:p-6 w-full">{children}</main>
      </div>
      {/* Mobile navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>
      {/* Shared Notifications Modal */}
      <NotificationModal open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

export default MainLayout;
