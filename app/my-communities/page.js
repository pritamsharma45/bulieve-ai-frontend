"use client";

import { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import SearchBar from "@/components/SearchBar";
import {
  getCommunities,
  getMyCommunities,
  getCommunityMembers,
} from "@/app/actions/community";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function MyCommunities() {
  const { isAuthenticated, user } = useKindeAuth();
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      try {
        const [communitiesData, membershipsData] = await Promise.all([
          getMyCommunities(),
          isAuthenticated ? getCommunityMembers() : { results: [] },
        ]);

        const userMemberships = membershipsData.results.filter(
          (membership) => membership.user === user?.id
        );

        const userCommunities = communitiesData.results
          .filter((community) =>
            userMemberships.some(
              (membership) => membership.community === community.id
            )
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        setCommunities(userCommunities);
        setFilteredCommunities(userCommunities);
        setMemberships(userMemberships);
      } catch (error) {
        console.error("Error loading communities:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCommunities();
  }, [isAuthenticated, user?.id]);

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
        <h1 className="text-2xl font-bold mb-6">Joined Communities</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Joined Communities</h1>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search my communities..."
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
            {communities.length === 0
              ? "You haven't joined any communities yet."
              : "No communities found matching your search."}
          </p>
        )}
      </div>
    </div>
  );
}
