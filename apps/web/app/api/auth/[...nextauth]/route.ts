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
      const res = await api.post("/auth", {
        email: user.email!,
        userName: user.name!,
        name: user.name!,
        avatarUrl: user.image!,
        githubId: account?.providerAccountId,
        githubAccessToken: account?.access_token,
      });
      const savedUser = res.data.data;
      user._id = savedUser._id;
      return true;
    },
    jwt: ({ token, user, account }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.githubId = account.providerAccountId;
        token.email = user.email;
        token.name = user.name;
        token.avatarUrl = user.image;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.githubId = token.githubId as string;
        session.user.accessToken = token.accessToken as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user._id = token._id as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/issues`;
    },
  },
});

export { handler as GET, handler as POST };
