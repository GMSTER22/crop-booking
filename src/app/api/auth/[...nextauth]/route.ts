import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";

import { authOptions } from "./options";

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


const handler = NextAuth( authOptions as unknown as AuthOptions );

export { handler as GET, handler as POST }