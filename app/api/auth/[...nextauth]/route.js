import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
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
            fullName: user.fullName || null,
            consumerProfile: user.consumerProfile
              ? {
                id: user.consumerProfile.id,
                fullName: user.consumerProfile.fullName,
                jobTitle: user.consumerProfile.jobTitle,
                company: user.consumerProfile.company,
                industries: user.consumerProfile.industries,
                companiesTracked: user.consumerProfile.companiesTracked,
              }
              : null,

            businessProfile: user.businessProfile
              ? {
                id: user.businessProfile.id,
                businessName: user.businessProfile.businessName,
                industry: user.businessProfile.industry,
                annualRevenue: user.businessProfile.annualRevenue,
                numberOfEmployees: user.businessProfile.numberOfEmployees,
                companyWebsite: user.businessProfile.companyWebsite,
                twitter: user.businessProfile.twitter,
                linkedin: user.businessProfile.linkedin,
                instagram: user.businessProfile.instagram,
              }
              : null,
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
        token.email = user.email;
        token.hasConsumerProfile = user.hasConsumerProfile;
        token.hasBusinessProfile = user.hasBusinessProfile;
        token.consumerId = user.consumerId;
        token.businessId = user.businessId;
        token.consumerProfile = user.consumerProfile;  // ✅ add
        token.businessProfile = user.businessProfile;  // ✅ add
        token.fullName = user.fullName
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.hasConsumerProfile = token.hasConsumerProfile;
      session.user.hasBusinessProfile = token.hasBusinessProfile;
      session.user.consumerId = token.consumerId;
      session.user.businessId = token.businessId;
      session.user.consumerProfile = token.consumerProfile;  // ✅
      session.user.businessProfile = token.businessProfile;  // ✅
      session.fullName = token.fullName
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
