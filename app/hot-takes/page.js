import PostCard from "@/components/PostCard";

async function getPosts() {
  const res = await fetch("http://127.0.0.1:8000/api/posts/", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function HotTakes() {
  const data = await getPosts();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <div className="space-y-4">
        {data.results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
