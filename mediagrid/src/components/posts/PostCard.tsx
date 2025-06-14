"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import Image from "next/image"; // ✅ Next.js optimized image
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Timestamp } from "firebase/firestore";

export interface PostType {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "audio";
  createdAt: Timestamp | number;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: PostType;
  onLike: (postId: string) => void;
  onDelete?: (postId: string) => void;
  isDemo?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onDelete,
  isDemo,
}) => {
  const { currentUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const isAuthor = currentUser && post.authorId === currentUser.uid;

  const handleLike = () => {
    setIsLiked(true);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="mb-4 mediagrid-card overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.authorImage} />
            <AvatarFallback>{getInitials(post.authorName)}</AvatarFallback>
          </Avatar>
          <div>
            {isDemo ? (
              <span className="font-semibold">{post.authorName}</span>
            ) : (
              <NextLink
                href={`/profile/${post.authorId}`}
                className="font-semibold hover:underline"
              >
                {post.authorName}
              </NextLink>
            )}
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(
                post.createdAt instanceof Timestamp
                  ? post.createdAt.toDate()
                  : new Date(post.createdAt),
                { addSuffix: true }
              )}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isAuthor && (
              <>
                <DropdownMenuItem>Edit Post</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  Delete Post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>Report Post</DropdownMenuItem>
            <DropdownMenuItem>Share Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4">
        <p className="whitespace-pre-wrap">{post.content}</p>

        {post.mediaUrl && post.mediaType === "image" && (
          <div className="mt-3 relative w-full h-48 rounded-md overflow-hidden">
            <Image
              src={post.mediaUrl}
              alt="Post"
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pt-0 pb-2 flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            variant="ghost"
            className={`flex items-center space-x-1 ${
              isLiked ? "text-red-500" : ""
            }`}
            onClick={handleLike}
          >
            <Heart size={20} className={isLiked ? "fill-current" : ""} />
            <span>{post.likes}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="flex items-center space-x-1"
          >
            <MessageSquare size={20} />
            <span>{post.comments}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="flex items-center space-x-1"
          >
            <Share2 size={20} />
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleBookmark}
          className={isBookmarked ? "text-blue-500" : ""}
        >
          <Bookmark size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
