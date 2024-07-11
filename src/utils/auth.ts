import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import DiscordProvider from "next-auth/providers/discord";
import bcrypt from "bcryptjs";
import { connectDb } from "@/utils/connectDb";
import { Resend } from 'resend';


const scopes = ["identify"].join(" ");

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDb();
        const user = await User.findOne({ email: credentials.email });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id, email: user.email, role: user.role }; // Ensure returning a plain object
        }
        return null;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: { params: { scope: scopes } },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDb();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name || user.email?.split('@')[0],
          image: user.image,
          password: user.email,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // console.log('JWT Callback:', token); // Debug output
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.user.id = token.id;
        // session.user.role = token.role;
      }
      // console.log('Session Callback:', session); // Debug output
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl + '/welcome' ; // Redirect to home page after sign in
    // },
  }
};


const resend = new Resend('process.env.RESEND_API_KEY');

resend.apiKeys.create({ name: 'Production' });

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
