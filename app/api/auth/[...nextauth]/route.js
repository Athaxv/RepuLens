import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
            const user = await db.user.findUnique({
              where: { email },
              include: {
                consumerProfile: true,
                businessProfile: true,
              },
            });
        
            if (!user) {
              console.log("User not found");
              return null; // Return null instead of throwing
            }
        
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
              console.log("Invalid password");
              return null; // Return null instead of throwing
            }
        
            return {
              id: user.id,
              email: user.email,
              hasConsumerProfile: !!user.consumerProfile,
              hasBusinessProfile: !!user.businessProfile,
              consumerId: user.consumerProfile?.id || null,
              businessId: user.businessProfile?.id || null,
            };
          } catch (error) {
            console.error("Authorization error:", error);
            throw new Error("Something went wrong. Please try again.");
          }

      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.hasConsumerProfile = user.hasConsumerProfile;
        token.hasBusinessProfile = user.hasBusinessProfile;
        token.consumerId = user.consumerId;
        token.businessId = user.businessId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.hasConsumerProfile = token.hasConsumerProfile;
      session.user.hasBusinessProfile = token.hasBusinessProfile;
      session.user.consumerId = token.consumerId;
      session.user.businessId = token.businessId;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
