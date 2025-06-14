"use client";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

// Demo activities data
const demoActivities = [
  {
    id: 1,
    text: "You liked Alice's post.",
    time: "2m ago",
  },
  {
    id: 2,
    text: "You started following Bob.",
    time: "10m ago",
  },
  {
    id: 3,
    text: "You commented on Charlie's reel.",
    time: "1h ago",
  },
  {
    id: 4,
    text: "You uploaded a new post.",
    time: "2h ago",
  },
  {
    id: 5,
    text: "You updated your profile picture.",
    time: "3h ago",
  },
  {
    id: 6,
    text: "You joined the 'Nature Lovers' group.",
    time: "4h ago",
  },
  {
    id: 7,
    text: "You shared Bob's story.",
    time: "5h ago",
  },
  {
    id: 8,
    text: "You mentioned Grace in a comment.",
    time: "6h ago",
  },
  {
    id: 9,
    text: "You reacted to Diana's post.",
    time: "7h ago",
  },
  {
    id: 10,
    text: "You changed your cover photo.",
    time: "8h ago",
  },
];

export default function ActivityPage() {
  return (
    <MainLayout>
      <div className="w-full py-8 px-3 sm:px-6 md:px-0 sm:mb-12 md:mb-0">
        <h1 className="text-3xl font-bold mb-4">Activity</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Your recent activity will appear here.
        </p>
        <ul className="w-full space-y-2 sm:space-y-4">
          {demoActivities.map((activity, idx) => (
            <React.Fragment key={activity.id}>
              <li className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                <div className="flex-1">
                  <div className="text-[var(--color-text)] text-sm sm:text-base">
                    {activity.text}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {activity.time}
                  </div>
                </div>
              </li>
              {/* Divider for mobile, hide on desktop */}
              {idx < demoActivities.length - 1 && (
                <hr className="block sm:hidden border-t border-[var(--color-border)] mx-2" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}
