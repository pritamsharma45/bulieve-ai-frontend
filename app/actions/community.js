"use server";
import { revalidatePath } from "next/cache";
export async function joinCommunity(communityId, userId) {
  console.log("Joining community", communityId, userId);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community-members/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        community: communityId,
        user: userId,
        role: "member",
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to join community");
  }

  const data = await res.json();
  revalidatePath("/my-communities");
  revalidatePath("/stock-arena");
  return data;
}

export async function getCommunities(isPrivate = false) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/communities/?is_private=${isPrivate}`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch communities");
  }

  const data = await res.json();
  revalidatePath("/my-communities");
  revalidatePath("/stock-arena");
  return data;
}
export async function getMyCommunities() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/communities/`,
      {
        next: { revalidate: 0 },
        cache: "no-store",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch communities");
    }
  
    const data = await res.json();
    revalidatePath("/my-communities");
    revalidatePath("/stock-arena");
    return data;
  }
export async function getCommunityMembers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community-members/`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch communities");
  }

  const data = await res.json();
  revalidatePath("/my-communities");
  revalidatePath("/stock-arena");
  return data;
}

export async function getUserCommunities(userId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community-members/?user=${userId}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user communities");
  }

  return res.json();
}
