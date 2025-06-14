import React from "react";
import PostCard, { PostType } from "./PostCard";

interface PostListProps {
  posts: PostType[];
  onLike: (postId: string) => void;
  onDelete?: (postId: string) => void;
  isDemo?: boolean; // Add isDemo prop
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onLike,
  onDelete,
  isDemo,
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No posts to show
        </h3>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Follow some users to see their posts here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onDelete={onDelete}
          isDemo={isDemo} // Pass isDemo to PostCard
        />
      ))}
    </div>
  );
};

export default PostList;
