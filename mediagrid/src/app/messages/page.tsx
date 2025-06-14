"use client";
import MainLayout from "@/components/layout/MainLayout";
import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Demo friends data (should match friends page)
const demoFriends = [
  {
    id: "1",
    name: "Alice",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Diana",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Eve",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "6",
    name: "Frank",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "7",
    name: "Grace",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: "8",
    name: "Henry",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "9",
    name: "Ivy",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: "10",
    name: "Jack",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "11",
    name: "Karen",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: "12",
    name: "Leo",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "13",
    name: "Mona",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    id: "14",
    name: "Nate",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: "15",
    name: "Olivia",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    id: "16",
    name: "Paul",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    id: "17",
    name: "Quinn",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "18",
    name: "Rick",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: "19",
    name: "Sophie",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    id: "20",
    name: "Tom",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("user");
  const friend = demoFriends.find((f) => f.id === userId);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, []);

  return (
    <MainLayout>
      <div className="w-full py-8 px-0 md:px-0">
        {friend ? (
          <div className="w-full h-[calc(100vh-4rem-4rem)] flex flex-col bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-xl font-bold text-[var(--color-text)]">
                  {friend.name}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Online
                </div>
              </div>
            </div>
            {/* Chat area */}
            <div
              ref={chatAreaRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[var(--color-bg-secondary)]"
            >
              {/* Demo messages */}
              <div className="flex flex-col items-end">
                <div className="bg-[var(--color-primary)] text-[var(--color-bg-secondary)] px-4 py-2 rounded-lg mb-1 max-w-xs">
                  Hi {friend.name}! 👋
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  You &middot; 09:00
                </span>
              </div>
              <div className="flex flex-col items-start">
                <div className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-2 rounded-lg mb-1 max-w-xs">
                  Hello! How are you?
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {friend.name} &middot; 09:01
                </span>
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-[var(--color-primary)] text-[var(--color-bg-secondary)] px-4 py-2 rounded-lg mb-1 max-w-xs">
                  I&apos;m good, thanks!
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  You &middot; 09:02
                </span>
              </div>
              {/* End demo messages */}
            </div>
            {/* Message input */}
            <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex items-center gap-2">
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder={`Message ${friend.name}...`}
                className="flex-1 border border-[var(--color-border)] rounded px-4 py-2 bg-[var(--color-bg)] text-[var(--color-text)] outline-none"
              />
              <button className="ml-2 px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--color-bg-secondary)] font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                Send
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Messages</h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Your messages will appear here.
            </p>
          </>
        )}
      </div>
    </MainLayout>
  );
}
