'use server'

export async function getPosts(userId = null) {
  const url = userId 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/posts/?user=${userId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/posts/`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
} 