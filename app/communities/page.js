import CommunityCard from '@/components/CommunityCard';

async function getCommunities() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communities/`, {
    next: { revalidate: 300 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch communities');
  }
  
  return res.json();
}

export default async function Communities() {
  const data = await getCommunities();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Communities</h1>
      <div className="space-y-4">
        {data.results.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
} 