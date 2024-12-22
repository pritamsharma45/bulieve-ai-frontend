"use server";

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

export async function deletePost(postId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`;

  const res = await fetch(url, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
}
