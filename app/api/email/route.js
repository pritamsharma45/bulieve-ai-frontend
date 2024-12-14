import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Resend API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { to, subject, html } = await request.json();
    const result = await sendEmail({ to, subject, html });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in email API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 