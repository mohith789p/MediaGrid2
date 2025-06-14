import React, { useState } from "react";
import Link from "next/link";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import CreateModal from "@/components/modals/CreatePostModal";
import ReelPostModal from "@/components/modals/ReelPostModal";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: PlusSquare, label: "Create" },
  { icon: Heart, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const [createTypeModalOpen, setCreateTypeModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [reelModalOpen, setReelModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] md:hidden mx-1 mb-1 rounded">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            if (item.label === "Create") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-1",
                    "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                  )}
                  onClick={() => setCreateTypeModalOpen(true)}
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            }
            if (item.path) {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-1",
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
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
                className="w-full bg-[var(--color-primary)] text-[var(--color-bg-secondary)] py-2 rounded hover:bg-[var(--color-primary-hover)]"
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
    </>
  );
};

export default MobileNav;
