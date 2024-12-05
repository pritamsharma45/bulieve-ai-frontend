"use server";

export async function createComment(postId, userId, content) {
  console.log(postId, userId, content);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: postId,
      user_id: userId,
      content: content,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create comment");
  }

  return res.json();
}
