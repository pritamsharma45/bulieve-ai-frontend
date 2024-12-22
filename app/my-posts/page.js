"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { getPosts, deletePost } from "@/app/actions/posts";
import { getCurrentUser } from "@/app/actions/auth";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const user = await getCurrentUser();
        const data = await getPosts(user.email);
        setPosts(data.results.filter((post) => post.user.email === user.email));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleEdit = (post) => {
    console.log("Edit post:", post);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Posts</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>

      <CreatePost onPostCreated={handlePostCreated} />

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isMyPost={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            You haven&apos;t created any posts yet.
          </p>
        )}
      </div>
    </div>
  );
}
