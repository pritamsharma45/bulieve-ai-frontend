"use client";

import PostCard from "@/components/PostCard";
import { ArrowLeft, Users, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getCommunity(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/communities/${id}/`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch community");
  }

  return res.json();
}

async function getCommunityPosts(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/?community_id=${id}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch community posts");
  }

  return res.json();
}

export default function CommunityDetail({ params }) {
  const router = useRouter();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [communityData, postsData] = await Promise.all([
          getCommunity(params.id),
          getCommunityPosts(params.id),
        ]);
        setCommunity(communityData);
        setPosts(postsData.results);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  if (loading || !community) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 mb-6 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Stock Arena
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl">
              {community.name[0].toUpperCase()}
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{community.name}</h1>
                {community.is_private && (
                  <Lock className="h-5 w-5 ml-2 text-gray-500" />
                )}
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Users className="h-5 w-5 mr-1" />
                <span>{community.member_count} members</span>
              </div>
            </div>
          </div>
        </div>
        {community.description && (
          <p className="text-gray-600 dark:text-gray-300">
            {community.description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Community Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center py-8">
            No posts in this community yet.
          </p>
        )}
      </div>
    </div>
  );
}
