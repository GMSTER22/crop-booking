import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { checkUser, fetchUserByEmail } from "@/app/lib/data";

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number
    }
  }
}

const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  callbacks: {
    async signIn( { user } : { user: User } ) {

      await checkUser( user );

      // console.log(response, 'response');

      // const data = await response?.json();

      // console.log(data, 'data');
      
      return true;
    },

    async session( { session } : { session: any } ) {

      const { id, is_admin } = await fetchUserByEmail( session.user.email );

      session.user.id = id;
      session.user.is_admin = is_admin;

      return session

    },
  }
}

const handler = NextAuth( authOptions as any );

export { handler as GET, handler as POST }