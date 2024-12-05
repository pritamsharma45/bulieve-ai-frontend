export const authConfig = {
  authRoutes: {
    signIn: "/api/auth/login",
    signUp: "/api/auth/register",
    signOut: "/api/auth/logout",
    error: "/error",
    callback: "/api/auth/callback"
  },
  callbacks: {
    signIn: async ({ user }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/creation`,
          {
            method: 'GET',
          }
        );
        return true;
      } catch (error) {
        console.error('Error in sign in callback:', error);
        return true; // Still return true to allow sign in
      }
    },
  },
}; 