
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  bio?: string;
  followers?: string[];
  following?: string[];
  isPrivate?: boolean;
}

interface UserCardProps {
  user: UserProfile;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { currentUser, followUser, unfollowUser } = useAuth();

  const isFollowing = currentUser?.following?.includes(user.uid);
  const isCurrentUser = currentUser?.uid === user.uid;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(user.uid);
      } else {
        await followUser(user.uid);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
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
    <Card className="mediagrid-card">
      <CardContent className="p-4 flex items-center justify-between">
        <Link
          href={`/profile/${user.uid}`}
          className="flex items-center space-x-3"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.displayName}</h3>
            {user.bio && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {user.bio}
              </p>
            )}
          </div>
        </Link>

        {!isCurrentUser && (
          <Button
            onClick={handleFollowToggle}
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className={isFollowing ? "" : "gradient-button"}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
