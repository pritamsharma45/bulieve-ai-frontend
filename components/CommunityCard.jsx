"use client";

import Link from 'next/link';
import { Users, Lock } from 'lucide-react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useState, useEffect } from 'react';
import { joinCommunity } from '@/app/actions/community';

export default function CommunityCard({ community, membership, onJoin }) {
  const { isAuthenticated, user } = useKindeAuth();
  const [isJoining, setIsJoining] = useState(false);
  const [memberCount, setMemberCount] = useState(community.member_count);
  const [isMember, setIsMember] = useState(!!membership);

  useEffect(() => {
    setIsMember(!!membership);
  }, [membership]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = "/api/auth/login";
      return;
    }

    if (isJoining || isMember) return;

    setIsJoining(true);
    try {
      await joinCommunity(community.id, user.id);
      setMemberCount(prev => prev + 1);
      setIsMember(true);
      if (onJoin) onJoin();
    } catch (error) {
      console.error('Error joining community:', error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
            {community.name[0].toUpperCase()}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">{community.name}</h3>
              {community.is_private && (
                <Lock className="h-4 w-4 ml-2 text-gray-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">Created {formatDate(community.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-1" />
            <span>{memberCount}</span>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleJoin}
              disabled={isJoining || isMember}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                isMember
                  ? 'bg-gray-200 text-gray-600 cursor-default'
                  : isJoining
                  ? 'bg-blue-400 text-white cursor-wait'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isJoining ? 'Joining...' : isMember ? 'Joined' : 'Join'}
            </button>
          )}
        </div>
      </div>
      {community.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm">{community.description}</p>
      )}
      <Link href={`/communities/${community.id}`} className="mt-3 text-blue-500 hover:text-blue-600 text-sm block">
        View Community →
      </Link>
    </div>
  );
} 