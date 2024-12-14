import { Resend } from 'resend';

export async function sendEmail({ to, subject, html }) {
  try {
    // Create a new instance for each request to ensure fresh env vars
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validate required fields
    if (!to || !subject || !html) {
      throw new Error('Missing required email fields');
    }

    const data = await resend.emails.send({
      from: 'Bulieve <noreply@bulieve.in>',
      to,
      subject,
      html,
    });

    if (!data) {
      throw new Error('No response from Resend');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Email templates
export function getCommunityCreatedTemplate(communityName, creatorName) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Community Created!</h2>
      <p>Hello ${creatorName},</p>
      <p>Your community "${communityName}" has been successfully created on Bulieve.</p>
      <p>You can now:</p>
      <ul>
        <li>Share your community with others</li>
        <li>Create posts</li>
        <li>Engage with members</li>
      </ul>
      <p>Best regards,<br>The Bulieve Team</p>
    </div>
  `;
} 