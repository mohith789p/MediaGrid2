"use client";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

export default function FriendsPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="w-full py-8 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-4">Friends</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Your friends will appear here.
        </p>

        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {demoFriends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-sm"
            >
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-[var(--color-text)]">
                  {friend.name}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </div>
              </div>
              <button
                className="px-4 py-1 rounded bg-[var(--color-primary)] text-[var(--color-bg-secondary)] font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                onClick={() => router.push(`/messages?user=${friend.id}`)}
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}
