"use client";

import { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import { getCommunities, getCommunityMembers } from "@/app/actions/community";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function StockArena() {
  const { isAuthenticated, user } = useKindeAuth();
  const [communities, setCommunities] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [communitiesData, membershipsData] = await Promise.all([
          getCommunities(),
          isAuthenticated ? getCommunityMembers() : { results: [] },
        ]);

        setCommunities(communitiesData.results);
        setMemberships(membershipsData.results);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Stock Arena</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Stock Arena</h1>
      <div className="space-y-4">
        {communities.map((community) => {
          const membership = memberships.find(
            (m) => m.community === community.id && m.user === user?.id
          );
          return (
            <CommunityCard
              key={community.id}
              community={community}
              isMember={!!membership}
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
        })}
      </div>
      <pre>{JSON.stringify(communities, null, 2)}</pre>
      <pre>{JSON.stringify(memberships, null, 2)}</pre>
    </div>
  );
}
