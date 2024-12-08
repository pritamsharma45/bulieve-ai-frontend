'use client';

import { useEffect, useState } from 'react';
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import SearchBar from "@/components/SearchBar";
import { getPosts } from '@/app/actions/posts';

export default function HotTakes() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data.results);
        setFilteredPosts(data.results);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setFilteredPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.content.toLowerCase().includes(searchLower) ||
        post.user.username.toLowerCase().includes(searchLower)
    );
    setFilteredPosts(filtered);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Hot Takes</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hot Takes</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search posts by content or username..." />
      
      <CreatePost onPostCreated={handlePostCreated} />
      

      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No posts found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
