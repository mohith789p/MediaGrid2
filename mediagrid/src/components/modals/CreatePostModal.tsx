"use client";
import React, { useState } from "react";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, file });
    // TODO: Add API call to upload media
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="max-w-md w-full mx-auto p-6 rounded shadow-lg relative
        bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          aria-label="Close"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-4 text-[var(--color-text)]">
          Create New Media
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[var(--color-text)]">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[var(--color-text)]">
              Description
            </label>
            <textarea
              className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] px-3 py-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[var(--color-text)]">
              Media File
            </label>
            <input
              type="file"
              className="w-full text-[var(--color-text)] bg-[var(--color-bg)]"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-[var(--color-bg-secondary)] py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
