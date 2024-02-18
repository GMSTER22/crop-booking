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

      // console.log(user, 'user');
      // console.log(user.email, 'email');

      await checkUser( user );

      // console.log(response, 'response');

      // const data = await response?.json();

      // console.log(data, 'data');
      
      return true;
    },

    async session( { session } ) {

      const { id, is_admin } = await fetchUserByEmail( session.user.email );

      session.user.id = id;
      session.user.is_admin = is_admin;

      return session

    },
  }
}

const handler = NextAuth( authOptions );

export { handler as GET, handler as POST }