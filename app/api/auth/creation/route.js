import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) return NextResponse.redirect("/");

  try {
    // First check if user exists
    const checkUser = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("checkUser", checkUser);

    if (checkUser.status === 404) {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("email", user.email);
      formData.append("username", user.given_name || user.email.split("@")[0]);
      formData.append("full_name", user.given_name || "");
      formData.append("account_type", "individual");
      formData.append("password", "1234");
      formData.append("confirm_password", "1234");

      console.log("Creating user with ID:", formData);
      const createResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error("Failed to create user:", errorText);
        throw new Error("Failed to create user");
      }

      const createdUser = await createResponse.json();
      console.log("Created user:", createdUser);
    }

    // Redirect to home page after successful user check/creation
    return NextResponse.redirect(new URL("/", process.env.KINDE_SITE_URL));
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.redirect(new URL("/", process.env.KINDE_SITE_URL));
  }
}
