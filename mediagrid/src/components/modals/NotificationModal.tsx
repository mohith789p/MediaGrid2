import React from "react";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  // Sample notifications for demo
  const notifications = [
    {
      id: 1,
      message: "Alice liked your post.",
      time: "2m ago",
    },
    {
      id: 2,
      message: "Bob started following you.",
      time: "10m ago",
    },
    {
      id: 3,
      message: "Your reel has 100 new views.",
      time: "1h ago",
    },
    {
      id: 4,
      message: "Charlie commented: 'Awesome!'",
      time: "2h ago",
    },
    {
      id: 5,
      message: "Diana mentioned you in a comment.",
      time: "3h ago",
    },
    {
      id: 6,
      message: "Eve sent you a friend request.",
      time: "4h ago",
    },
    {
      id: 7,
      message: "Frank shared your post.",
      time: "5h ago",
    },
    {
      id: 8,
      message: "Grace replied to your story.",
      time: "6h ago",
    },
    {
      id: 9,
      message: "Henry tagged you in a photo.",
      time: "7h ago",
    },
    {
      id: 10,
      message: "Ivy liked your comment.",
      time: "8h ago",
    },
    {
      id: 11,
      message: "Jack started following you.",
      time: "9h ago",
    },
    {
      id: 12,
      message: "Karen sent you a message.",
      time: "10h ago",
    },
    {
      id: 13,
      message: "Leo invited you to join a group.",
      time: "12h ago",
    },
    {
      id: 14,
      message: "Mona reacted to your story.",
      time: "14h ago",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <aside
        className="relative z-50 w-full max-w-sm h-full bg-[var(--color-bg-secondary)] shadow-lg p-6 flex flex-col border-l border-[var(--color-border)]"
        style={{ animation: "slideInRight 0.2s" }}
      >
        <button
          className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-[var(--color-text)]">
          Notifications
        </h2>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <p className="text-[var(--color-text-secondary)]">
              No notifications yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="border-b border-[var(--color-border)] pb-2"
                >
                  <div className="text-[var(--color-text)]">{n.message}</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {n.time}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2563eb #e5e7eb;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default NotificationModal;
