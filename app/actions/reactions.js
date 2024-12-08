"use server";
import { revalidatePath } from "next/cache";

export async function createReaction(postId, userId, reactionType = "like") {
  console.log(postId, userId, reactionType);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reactions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: postId,
      reaction_type: reactionType,
      user: userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create reaction");
  }

  const data = await res.json();
  revalidatePath("/hot-takes");
  revalidatePath("/my-posts");
  revalidatePath("/posts/[id]", "page");
  return data;
}
