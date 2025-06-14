"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Image, Video, Mic, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NextImage from "next/image";

interface CreatePostFormProps {
  onSubmit: (content: string, media?: File) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "audio" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let type: "image" | "video" | "audio" | null = null;
    if (file.type.startsWith("image/")) type = "image";
    else if (file.type.startsWith("video/")) type = "video";
    else if (file.type.startsWith("audio/")) type = "audio";

    if (type) {
      setMedia(file);
      setMediaType(type);

      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === "" && !media) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content, media || undefined);
      setContent("");
      setMedia(null);
      setMediaPreview(null);
      setMediaType(null);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="mb-6 mediagrid-card">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage
                src={currentUser?.photoURL || undefined}
                alt="User avatar"
              />
              <AvatarFallback>
                {getInitials(currentUser?.displayName ?? null)}
              </AvatarFallback>
            </Avatar>
            <Textarea
              placeholder={`What's on your mind, ${
                currentUser?.displayName?.split(" ")[0] || "there"
              }?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none focus-visible:ring-mediagrid-purple"
              rows={3}
            />
          </div>

          {mediaPreview && (
            <div className="mt-4 relative">
              {mediaType === "image" && (
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <NextImage
                    src={mediaPreview}
                    alt="Media preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {mediaType === "video" && (
                <video
                  src={mediaPreview}
                  className="w-full rounded-md"
                  controls
                />
              )}
              {mediaType === "audio" && (
                <audio src={mediaPreview} className="w-full" controls />
              )}
              <button
                type="button"
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                aria-label="Remove media"
              >
                <X size={16} aria-label="Remove icon" role="img" />
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleMediaChange}
            accept="image/*, video/*, audio/*"
            className="hidden"
          />
        </CardContent>

        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <div className="flex space-x-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-mediagrid-purple"
            >
              <Image
                size={20}
                className="mr-1"
                aria-label="Image icon"
                role="img"
              />
              Image
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-mediagrid-orange"
            >
              <Video
                size={20}
                className="mr-1"
                aria-label="Video icon"
                role="img"
              />
              Video
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-mediagrid-blue"
            >
              <Mic
                size={20}
                className="mr-1"
                aria-label="Audio icon"
                role="img"
              />
              Audio
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || (content.trim() === "" && !media)}
            className="gradient-button"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
