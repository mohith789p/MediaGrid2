import React, { useRef } from "react";
import { Upload } from "lucide-react";

interface ReelPostModalProps {
  open: boolean;
  onClose: () => void;
}

const ReelPostModal: React.FC<ReelPostModalProps> = ({ open, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // handle dropped files here
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // TODO: handle file upload
      console.log(files[0]);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: handle file upload
      console.log(file);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="relative w-full max-w-3xl mx-auto rounded min-h-[400px] p-0 flex flex-col shadow-lg
        bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <h1 className="text-2xl font-semibold px-8 pt-8 pb-2 text-[var(--color-text)]">
          Upload reel
        </h1>
        <div
          className="flex-1 flex flex-col items-center justify-center px-8 pb-8"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[var(--color-bg)] flex items-center justify-center w-40 h-40 mb-6">
              <Upload
                size={64}
                className="text-[var(--color-text-secondary)]"
              />
            </div>
            <div className="text-lg font-medium mb-2 text-center text-[var(--color-text)]">
              Drag and drop video files to upload
            </div>
            <div className="text-[var(--color-text-secondary)] text-sm mb-6 text-center">
              Your reels will be private until you publish them.
            </div>
            <button
              className="bg-[var(--color-primary)] text-[var(--color-bg-secondary)] font-semibold px-8 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition mb-2"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Select files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelPostModal;
