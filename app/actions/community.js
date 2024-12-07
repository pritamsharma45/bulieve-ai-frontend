"use server";

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

  return res.json();
}

export async function getCommunities() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/communities/`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch communities");
  }

  return res.json();
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
