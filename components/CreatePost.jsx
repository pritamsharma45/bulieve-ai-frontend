"use client";

import { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Send, X } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';

export default function CreatePost({ onPostCreated, communityId = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useKindeAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          content: content,
          post_type: "text",
          visibility: "public",
          ...(communityId && { community: communityId }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      trackEvent(ANALYTICS_EVENTS.POST_CREATED, {
        communityId: communityId,
        userId: user.id,
      });
      setContent("");
      setIsModalOpen(false);
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 text-left text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {communityId ? "Share something with the community..." : "What's on your mind?"}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold mb-4">Create Post</h2>

            <form onSubmit={handleSubmit}>
              <RichTextEditor content={content} onChange={setContent} />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !content.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 