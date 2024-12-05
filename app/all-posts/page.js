'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import { getPosts } from '@/app/actions/posts';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data.results);
    }
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <CreatePost onPostCreated={handlePostCreated} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 