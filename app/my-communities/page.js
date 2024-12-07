'use client';

import { useEffect, useState } from 'react';
import CommunityCard from "@/components/CommunityCard";
import { getUserCommunities } from '@/app/actions/community';
import { getCurrentUser } from '@/app/actions/auth';

export default function MyCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      try {
        const user = await getCurrentUser();
        const data = await getUserCommunities(user.id);
        setCommunities(data.results);
      } catch (error) {
        console.error('Error loading communities:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCommunities();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Communities</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Communities</h1>
      
      <div className="space-y-4">
        {communities.length > 0 ? (
          communities.map((membership) => (
            <CommunityCard key={membership.community} community={membership.community_details} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            You haven&apos;t joined any communities yet.
          </p>
        )}
      </div>
    </div>
  );
} 