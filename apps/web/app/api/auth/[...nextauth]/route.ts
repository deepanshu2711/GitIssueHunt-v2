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
    signIn: ({ user, account }) => {
      //TODO: do some db operation here
      return true;
    },
    jwt: ({ token, user, account }) => {
      //TODO: add additional required fileds
      return token;
    },
    async session({ session, token }) {
      //TODO: add required fileds from token to session
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/issues`;
    },
  },
});

export { handler as GET, handler as POST };
