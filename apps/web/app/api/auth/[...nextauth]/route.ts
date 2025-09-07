import api from "@web/lib/api";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account }) => {
      await api.post("/auth", {
        email: user.email!,
        userName: user.name!,
        name: user.name!,
        avatarUrl: user.image!,
        githubId: account?.providerAccountId,
        githubAccessToken: account?.access_token,
      });
      return true;
    },
    jwt: ({ token, user, account }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.githubId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/issues`;
    },
  },
});

export { handler as GET, handler as POST };
