"use client";
import React, { useRef, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Bot,
  Search,
  Brain,
  Image as ImageIcon,
  Paperclip,
  ArrowUpCircle,
  SlidersHorizontal,
} from "lucide-react";

const features = [
  {
    icon: <Search className="w-5 h-5 mr-2" />,
    title: "DeepSearch",
    description:
      "Search deeply to deliver detailed, well-reasoned answers with MediaGrid's rapid, agentic search.",
  },
  {
    icon: <Brain className="w-5 h-5 mr-2" />,
    title: "Think",
    description:
      "Solve the hardest problems in math, science, and coding with our reasoning model.",
  },
  {
    icon: <ImageIcon className="w-5 h-5 mr-2" />,
    title: "Edit Image",
    description: "Transform your images with style transfers, edits, and more.",
  },
];

const ChatAIPage = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <MainLayout>
      <div className="w-full py-8 px-0 md:px-0">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mt-16 mb-10">
          <span className="text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-500 to-indigo-700 text-transparent bg-clip-text">
            MediaGrid AI
          </span>
        </div>

        {/* Chat Input Section */}
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleSend}
            className="bg-[var(--color-bg-secondary)] rounded-2xl shadow flex flex-col gap-4 p-6 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-[var(--color-text-secondary)] cursor-pointer" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--color-text-secondary)] text-[var(--color-text)]"
                placeholder="Ask anything"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="button"
                className="p-2 rounded-full hover:bg-[var(--color-bg)]"
                tabIndex={-1}
              >
                <SlidersHorizontal className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
              <button
                type="submit"
                className="ml-2 p-2 rounded-full bg-[var(--color-primary)] hover:bg-opacity-90 transition"
              >
                <ArrowUpCircle className="w-6 h-6 text-[var(--color-bg-secondary)]" />
              </button>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-1 rounded-full text-sm flex items-center gap-2 border border-[var(--color-border)]"
              >
                <Search className="w-4 h-4" /> DeepSearch
              </button>
              <button
                type="button"
                className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-1 rounded-full text-sm flex items-center gap-2 border border-[var(--color-border)]"
              >
                <Brain className="w-4 h-4" /> Think
              </button>
              <button
                type="button"
                className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-1 rounded-full text-sm flex items-center gap-2 border border-[var(--color-border)]"
              >
                <ImageIcon className="w-4 h-4" /> Edit Image
              </button>
            </div>
          </form>
        </div>

        {/* Draw Me Card */}
        <div className="w-full max-w-2xl mx-auto mt-6">
          <div className="flex items-center bg-[var(--color-bg-secondary)] rounded-xl p-4 mb-6 border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center mr-4">
              <ImageIcon className="w-6 h-6 text-[var(--color-bg-secondary)]" />
            </div>
            <div>
              <div className="font-semibold text-[var(--color-primary)]">
                Draw Me
              </div>
              <div className="text-[var(--color-text-secondary)] text-sm">
                Click here to try a random style!
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-4xl mx-auto mt-2">
          <div className="mb-2">
            <span className="font-bold text-lg text-[var(--color-primary)]">
              MediaGrid AI is here.
            </span>
            <span className="ml-2 text-[var(--color-text-secondary)]">
              Try our new features: DeepSearch, Think, and Edit Image
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex-1 bg-[var(--color-bg-secondary)] rounded-xl p-5 flex flex-col border border-[var(--color-border)]"
              >
                <div className="flex items-center mb-2">
                  {feature.icon}
                  <span className="font-semibold text-[var(--color-primary)]">
                    {feature.title}
                  </span>
                </div>
                <div className="text-[var(--color-text-secondary)] text-sm">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatAIPage;
