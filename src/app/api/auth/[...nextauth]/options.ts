import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { checkUser, fetchUserByEmail } from "@/app/lib/data";

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
}

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  callbacks: {
    async signIn( { user } : { user: User } ) {

      await checkUser( user );

      return true;
    },

    async session( { session } : { session: any } ) {

      const { id, is_admin } = await fetchUserByEmail( session.user.email );

      session.user.id = id;
      session.user.is_admin = is_admin;

      return session

    },
  },

  pages: {

    signIn: '/login'

  }
  
}