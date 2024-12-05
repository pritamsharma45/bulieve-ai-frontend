import Link from 'next/link';
import { Users, Lock } from 'lucide-react';

export default function CommunityCard({ community }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/communities/${community.id}`}>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
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
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-1" />
            <span>{community.member_count}</span>
          </div>
        </div>
        {community.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">{community.description}</p>
        )}
      </article>
    </Link>
  );
} 