"use client";

import { MessageCircle, Heart, Share2, ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { createReaction } from "@/app/actions/reactions";
import { createComment } from "@/app/actions/comments";
import ShareMenu from "./ShareMenu";
import Comment from "./Comment";
import DOMPurify from "isomorphic-dompurify";
import AuthDialog from "./AuthDialog";

export default function PostDetail({ post }) {
  const router = useRouter();
  const { isAuthenticated, user } = useKindeAuth();
  const [comment, setComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [reactionsCount, setReactionsCount] = useState(
    post.reactions_count || 0
  );
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [postUrl, setPostUrl] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    try {
      await createReaction(post.id, user.id);
      setReactionsCount((prev) => prev + 1);
      router.refresh();
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (!comment.trim() || isCommenting) return;

    setIsCommenting(true);
    try {
      const newComment = await createComment(post.id, user.id, comment.trim());
      setComment("");
      setCommentsCount((prev) => prev + 1);
      setComments((prev) => [newComment, ...prev]);
      router.refresh();
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 mb-4 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Go Back
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              {post.user.username[0].toUpperCase()}
            </div>
          </div>
          <div className="ml-3">
            <p className="font-medium">{post.user.username}</p>
            <p className="text-sm text-gray-500">
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>

        <div className="flex items-center justify-between text-gray-500 border-t pt-4">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 ${
              isLiking ? "opacity-50" : "hover:text-red-500"
            }`}
          >
            <Heart className={`h-6 w-6 ${isLiking ? "animate-pulse" : ""}`} />
            <span>{reactionsCount}</span>
          </button>
          <button className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6" />
            <span>{commentsCount}</span>
          </button>
          <ShareMenu url={postUrl} title={post.content.substring(0, 100)} />
        </div>
      </article>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {isAuthenticated && (
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                disabled={isCommenting}
              />
              <button
                type="submit"
                disabled={isCommenting || !comment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send
                  className={`h-4 w-4 ${isCommenting ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No comments yet</p>
          )}
        </div>
      </div>

      {showAuthDialog && (
        <AuthDialog
          isOpen={showAuthDialog}
          onClose={() => setShowAuthDialog(false)}
        />
      )}
    </div>
  );
}
