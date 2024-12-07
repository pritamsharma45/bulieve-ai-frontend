"use client";

import { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import { getCommunityMembers, getCommunities } from "@/app/actions/community";
import { getCurrentUser } from "@/app/actions/auth";
import Link from "next/link";

export default function MyCommunities() {
  const [memberships, setMemberships] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      try {
        const user = await getCurrentUser();
        
        // First get user's memberships
        const membershipData = await getCommunityMembers();
        const userMemberships = membershipData.results.filter(
          (membership) => membership.user === user.id
        );
        setMemberships(userMemberships);

        // Then get all communities
        const communitiesData = await getCommunities();
        
        // Filter communities based on memberships
        const userCommunities = communitiesData.results.filter((community) =>
          userMemberships.some((membership) => membership.community === community.id)
        );
        
        setCommunities(userCommunities);
      } catch (error) {
        console.error("Error loading communities:", error);
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
          communities.map((community) => {
            const membership = memberships.find(
              (m) => m.community === community.id
            );
            return (
              <div
                key={community.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                      {community.name[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">{community.name}</h3>
                      <p className="text-sm text-gray-500">
                        Joined {new Date(membership.joined_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {membership.role}
                  </span>
                </div>
                {community.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {community.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">{community.member_count} members</span>
                  </div>
                  <Link
                    href={`/communities/${community.id}`}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    View Community →
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-8">
            You haven&apos;t joined any communities yet.
          </p>
        )}
      </div>
    </div>
  );
}
