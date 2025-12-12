import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "@/backend/controller/userController";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Only process Google sign-ins
        if (account?.provider === "google" && profile?.sub) {
          // Save or update user in database
          await upsertUser({
            googleId: profile.sub,
            email: user.email!,
            name: user.name || undefined,
            picture: user.image || undefined,
          });

          console.log("✅ User saved to database:", user.email);
        }

        return true; // Allow sign in
      } catch (error) {
        console.error("❌ Error saving user to database:", error);
        // Still allow sign in even if database save fails
        return true;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account?.provider === "google" && profile?.sub) {
        token.googleId = profile.sub;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};