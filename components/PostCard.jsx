"use client";

import Link from "next/link";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useState, useEffect } from "react";
import { createReaction } from "@/app/actions/reactions";
import ShareMenu from "./ShareMenu";
import { useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { trackEvent, ANALYTICS_EVENTS } from "@/utils/analytics";

export default function PostCard({ post }) {
  const { isAuthenticated, user } = useKindeAuth();
  const router = useRouter();
  const [isLiking, setIsLiking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reactionsCount, setReactionsCount] = useState(post.reactions_count || 0);
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    setPostUrl(`${window.location.origin}/posts/${post.id}`);
  }, [post.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = "/api/auth/login";
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    try {
      console.log("Post ID, ser ID", post.id, user.id);
      await createReaction(post.id, user.id);
      trackEvent(ANALYTICS_EVENTS.POST_LIKED, {
        postId: post.id,
        userId: user.id,
      });
      setReactionsCount((prev) => prev + 1);
      router.refresh();
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = "/api/auth/login";
      return;
    }
    window.location.href = `/posts/${post.id}`;
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {post.user.username[0].toUpperCase()}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{post.user.username}</p>
          <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
        </div>
      </div>

      <div className="mb-3">
        <Link href={`/posts/${post.id}`} className="block cursor-pointer">
          <div
            className={`prose dark:prose-invert max-w-none ${
              !isExpanded ? "line-clamp-6" : ""
            }`}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:text-blue-600 text-sm mt-2 focus:outline-none"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-1 cursor-pointer transition-colors ${
            isLiking ? "opacity-50" : "hover:text-red-500"
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiking ? "animate-pulse" : ""}`} />
          <span className="text-sm">{reactionsCount}</span>
        </button>
        <button
          onClick={handleComment}
          className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">{post.comments_count}</span>
        </button>
        <ShareMenu url={postUrl} title={post.content.substring(0, 100)} />
      </div>
    </article>
  );
}
