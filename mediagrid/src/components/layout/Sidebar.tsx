import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  Heart,
  User,
  Users,
  MessageSquare,
  PlusSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CreateModal from "@/components/modals/CreatePostModal";
import ReelPostModal from "@/components/modals/ReelPostModal";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Heart, label: "Activity", path: "/activity" },
  { icon: PlusSquare, label: "Create" },
  { icon: MessageSquare, label: "Chat with AI", path: "/chat-ai" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Users, label: "Friends", path: "/friends" },
];

interface SidebarProps {
  onOpenNotifications?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenNotifications }) => {
  const pathname = usePathname();
  const [createTypeModalOpen, setCreateTypeModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [reelModalOpen, setReelModalOpen] = useState(false);

  // Highlight "Friends" when on /messages or /friends
  const isFriendsActive =
    pathname === "/friends" || pathname?.startsWith("/messages");

  return (
    <aside className="hidden md:flex flex-col w-64 border-r h-[calc(100vh-4rem)] bg-[var(--color-bg-secondary)] border-[var(--color-border)] sticky top-16">
      <nav className="p-4 space-y-2 flex-1">
        {navItems.map((item) => {
          let isActive = pathname === item.path;
          // Special case for Friends: also highlight on /messages
          if (item.label === "Friends" && isFriendsActive) {
            isActive = true;
          }
          if (item.label === "Create") {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setCreateTypeModalOpen(true)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full",
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-bg-secondary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          }
          if (item.label === "Notifications") {
            return (
              <button
                key={item.path}
                type="button"
                onClick={onOpenNotifications}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full",
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-bg-secondary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          }
          // Only render Link if item.path is defined
          if (item.path) {
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-bg-secondary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          }
          // fallback (should not happen)
          return null;
        })}
      </nav>
      {/* Create Type Modal */}
      {createTypeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded shadow-lg p-6 relative w-80">
            <button
              onClick={() => setCreateTypeModalOpen(false)}
              className="absolute top-2 right-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-[var(--color-text)]">
              Create
            </h2>
            <div className="flex flex-col gap-4">
              <button
                className="w-full bg-[var(--color-primary)] text-[var(--color-bg-secondary)] py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                onClick={() => {
                  setCreateTypeModalOpen(false);
                  setPostModalOpen(true);
                }}
              >
                Post
              </button>
              <button
                className="w-full bg-purple-600 dark:bg-purple-500 text-white dark:text-gray-900 py-2 rounded hover:bg-purple-700 dark:hover:bg-purple-600"
                onClick={() => {
                  setCreateTypeModalOpen(false);
                  setReelModalOpen(true);
                }}
              >
                Reel
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateModal
        open={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
      <ReelPostModal
        open={reelModalOpen}
        onClose={() => setReelModalOpen(false)}
      />
    </aside>
  );
};

export default Sidebar;
