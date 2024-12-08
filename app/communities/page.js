"use client";

import { useEffect, useState } from 'react';
import CommunityCard from '@/components/CommunityCard';
import SearchBar from '@/components/SearchBar';
import { getCommunities, getCommunityMembers } from '@/app/actions/community';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function Communities() {
  const { isAuthenticated, user } = useKindeAuth();
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      try {
        const [communitiesData, membershipsData] = await Promise.all([
          getCommunities(false),
          isAuthenticated ? getCommunityMembers() : { results: [] },
        ]);

        const sortedCommunities = [...communitiesData.results].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCommunities(sortedCommunities);
        setFilteredCommunities(sortedCommunities);
        setMemberships(membershipsData.results || []);
      } catch (error) {
        console.error('Error loading communities:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCommunities();
  }, [isAuthenticated]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCommunities(communities);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = communities.filter(
      (community) =>
        community.name.toLowerCase().includes(searchLower) ||
        (community.description &&
          community.description.toLowerCase().includes(searchLower))
    );
    setFilteredCommunities(filtered);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Communities</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Communities</h1>
      
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search communities by name or description..." 
      />

      <div className="space-y-4">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => {
            const membership = memberships.find(
              (m) => m.community === community.id && m.user === user?.id
            );
            return (
              <CommunityCard
                key={community.id}
                community={community}
                membership={membership}
                onJoin={() => {
                  setMemberships((prev) => [
                    ...prev,
                    {
                      community: community.id,
                      user: user?.id,
                    },
                  ]);
                }}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-8">
            No communities found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
